// Importa de Mongoose el Schema (per definir l'estructura) i el model (per crear la col·lecció)
const { Schema, model } = require('mongoose');

// Esquema d'una categoria de producte
const categoriaSchema = new Schema({
  // Nom: text obligatori, únic i només pot ser "compte", "recursos" o "bots"
  nom: { type: String, required: true, unique: true, enum: ['compte', 'recursos', 'bots'] },
});

// Crea el model "Categoria" i l'exporta
module.exports = model('Categoria', categoriaSchema);
