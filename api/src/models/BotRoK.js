// Importa de Mongoose el Schema (per definir l'estructura) i el model (per crear la col·lecció)
const { Schema, model } = require('mongoose');

// Esquema d'un bot que farmeja automàticament dins del joc
const botRoKSchema = new Schema({
  // Tipus de farmeig: obligatori, només un dels valors de la llista
  tipusFarmeig: {
    type: String, // ha de ser text
    required: true, // no es pot deixar buit
    enum: ['gemes', 'aliments', 'fusta', 'pedra', 'or', 'barbars', 'forts_barbars'], // valors permesos
  },
  // Descripció: text obligatori
  descripcio: { type: String, required: true },
  // Preu: número obligatori, no pot ser negatiu
  preu: { type: Number, required: true, min: 0 },
  // Categoria: guarda l'_id d'una Categoria (relació 1..N); obligatòria
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
  // Venedor: guarda l'_id de l'Usuari que el ven (relació 1..N); obligatori
  venedor: { type: Schema.Types.ObjectId, ref: 'Usuari', required: true },
});

// Índex sobre "tipusFarmeig": fa que cercar bots per tipus sigui més ràpid
botRoKSchema.index({ tipusFarmeig: 1 });

// Crea el model "BotRoK" i l'exporta
module.exports = model('BotRoK', botRoKSchema);
