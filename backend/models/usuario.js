const {Schema, model} = require ('mongoose'); // SE REQUIEREN LOS DOS METODOS SCHEMA Y MODEL

//Formato que va a tener las colecciones en la base de datos
const userSchema = new Schema({
    nombre: {type:String, required:true},
    apellido: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    role: {type:String, required:true}
},{
    timestamps: true //se agrega en la base un campo llamado createdup y updateup 
});

module.exports = model('usuarios', userSchema);

