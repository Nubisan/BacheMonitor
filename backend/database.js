const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://madelin:aAGjJCDZGC24xuVI@cluster0.saarj2n.mongodb.net/bachemonitor?retryWrites=true&w=majority';

mongoose.connect(dbUri)
  .then(() => {
    console.log('Conexión a MongoDB Atlas exitosa');
  })
  .catch((error) => {
    console.error('Error conectándose a MongoDB Atlas:', error);
});

module.exports = mongoose;