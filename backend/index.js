// Inicio del servidor 

const express = require('express'); 
const cors = require('cors');

require('dotenv').config();
require('./database');

const app = express(); 
app.use(cors());
app.use(express.json()); //Ser capaz de convertie los datos que recibe del servidor a datos javascript que van a apoderse manipular
app.use(express.urlencoded({extended: false}));

app.use('/api', require('./routes/usuarios'));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
