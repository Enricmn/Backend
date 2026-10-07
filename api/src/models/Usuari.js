// Importa de Mongoose el Schema (per definir l'estructura) i el model (per crear la col·lecció)
const { Schema, model } = require('mongoose');

// Esquema d'un usuari de la plataforma (pot comprar i vendre)
const usuariSchema = new Schema({
  // Nom: text obligatori
  nom: { type: String, required: true },
  // Email: text obligatori, únic (no es pot repetir) i amb format text@text.text
  email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ }, // unique també crea un índex
  // Contrasenya: text obligatori, de mínim 8 caràcters
  contrasenya: { type: String, required: true, minlength: 8 },
  // Rol: només pot ser "usuari" o "administrador"; si no s'indica, és "usuari"
  rol: { type: String, enum: ['usuari', 'administrador'], default: 'usuari' },
});

// Crea el model "Usuari" a partir de l'esquema i l'exporta perquè es pugui fer servir a altres fitxers
module.exports = model('Usuari', usuariSchema);
