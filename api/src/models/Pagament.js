// Importa de Mongoose el Schema (per definir l'estructura) i el model (per crear la col·lecció)
const { Schema, model } = require('mongoose');

// Esquema d'un pagament (n'hi ha un per cada comanda)
const pagamentSchema = new Schema({
  // Mètode de pagament: obligatori, només "targeta", "paypal" o "altres"
  metode: { type: String, required: true, enum: ['targeta', 'paypal', 'altres'] },
  // Import: número obligatori, no pot ser negatiu
  import: { type: Number, required: true, min: 0 },
  // Data: si no s'indica, es posa el moment actual
  data: { type: Date, default: Date.now },
  // Estat: només "pendent", "completat" o "fallit"; si no s'indica, és "pendent"
  estat: { type: String, enum: ['pendent', 'completat', 'fallit'], default: 'pendent' },
  // Comanda: guarda l'_id de la Comanda; unique fa que una comanda només tingui un pagament (relació 1..1)
  comanda: { type: Schema.Types.ObjectId, ref: 'Comanda', required: true, unique: true },
});

// Crea el model "Pagament" i l'exporta
module.exports = model('Pagament', pagamentSchema);
