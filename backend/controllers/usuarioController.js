const user = require('../models/usuario'); // modelo del usuario, interaccion con el usuario para ingreso, consulta, etc 
const usersController = {};
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

usersController.getUsers = async(req, res) => 
{
    try {
        const users = await user.find();
        res.json(users);
    } catch (error) {
        res.json({error: error.message});
    }
}

usersController.getUser = async(req, res) =>
{
    const { userId } = req.params;

    try {
        const userFind = await user.findById(userId);
        res.json(userFind);
    } catch (error) {
        res.json({error: error.message});
    }
}

usersController.addUser = async(req, res) => 
{
    try {

    //Encriptar la contrasena con un metodo sincronico 
    req.body.password = bcrypt.hashSync(req.body.password, 12);

    const newUser =  await user.create(req.body)

    //Se guarda en la base de datos 
    await newUser.save();// .save() metodo asincrono toma tiempo para gardarse para poder continuar con otras tareas agregar await y en la funcion async
    
    //Se envía como estado “OK” o estado 200. Y se imprime el token 
    res.status(200);

    //Se imprime en consola los datos enviados en el JSON 
    console.log(newUser);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar usuario');
    }
    
}

// Controlador para ingreso
usersController.loginUser = async (req, res) => {

    try {

        //Se realiza una búsqueda mediante el correo en la base de datos si lo encuentra lo guarda
        const userFind = await user.findOne({ email: req.body.email });

        if (!userFind) {
            return res.status(401).json({ message: "El correo no existe" });
        }

        const eq = bcrypt.compareSync(req.body.password, userFind.password);

        if (!eq) {
            return res.status(401).json({ message: "Clave incorrecta" });
        }

        res.status(200).json({
            success: 'Login correcto',
            token: createToken(userFind),
            role: userFind.role,
            user_id: userFind._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el ingreso' });
    }
};

function createToken(user){
    const payload = {
        user_id: user._id,
        user_role: user.role
    }

    return jwt.sign(payload,'secret',  { expiresIn: '1h' });
}

usersController.setUser = async (req, res) => {
    const { userId } = req.params;
    req.body.password = bcrypt.hashSync(req.body.password, 12);

   try {
    const User = await user.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(User);
   } catch (error) {
    res.json({error: error.message});
   }
}

usersController.deleteUser = async(req, res) => {
    const { userId } = req.params;
    try {
        const User = await user.findByIdAndDelete(userId);
        res.json({usuario: User, message: 'Usuario eliminado exitosamente'});
    } catch (error) {
        res.json({error: error.message});
    }    
}

usersController.updatePassword = async (req, res) => {
    const { userId } = req.params;
    req.body.password = bcrypt.hashSync(req.body.password, 12);

   try {
    const User = await user.findByIdAndUpdate(userId, { password: req.body.password }, { new: true });
    res.json(User);
   } catch (error) {
    res.json({error: error.message});
   }
}


module.exports = usersController;