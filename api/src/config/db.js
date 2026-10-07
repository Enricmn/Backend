// Importa Mongoose, la llibreria que fa de pont entre Node.js i MongoDB
const mongoose = require('mongoose');

// Funció asíncrona que s'encarrega de connectar amb la base de dades
const connectDB = async () => {
  try {
    // Intenta connectar amb Mongo fent servir l'adreça guardada al .env
    // "await" fa que s'esperi a tenir la resposta abans de continuar
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connectat correctament');
  } catch (err) {
    // Si la connexió falla, mostra l'error per consola
    console.error(err.message);
    // I atura el programa (el codi 1 vol dir "ha acabat amb error")
    process.exit(1);
  }
};

// Exporta la funció perquè index.js la pugui importar amb require('./config/db')
module.exports = connectDB;