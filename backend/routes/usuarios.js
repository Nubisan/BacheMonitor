//Rutas para usuario
const { Router } = require('express'); 
const router = Router();

const user = require('../controllers/usuarioController');
const { checkToken, verifyRole } = require('../utils/middlewares');

//Ruta para ingreso al sistema
router.post('/ingreso', user.loginUser);

//RUTAS ADMINISTRADOR
router.get('/admin/users', user.getUsers); 
router.get('/admin/:userId', user.getUser);
router.post('/admin/registro', user.addUser); 
router.put('/admin/:userId', user.setUser);
router.delete('/admin/:userId', user.deleteUser);

//RUTAS OPERADOR
router.get('/operator/:userId', user.getUser);
router.put('/operator/:userId', user.updatePassword);

module.exports = router;