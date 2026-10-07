// Importa de Mongoose el Schema (per definir l'estructura) i el model (per crear la col·lecció)
const { Schema, model } = require('mongoose');

// Esquema d'una comanda (la compra sencera d'un usuari)
const comandaSchema = new Schema({
  // Data: si no s'indica, es posa el moment actual
  data: { type: Date, default: Date.now },
  // Estat: només "pendent", "pagat" o "entregat"; si no s'indica, és "pendent"
  estat: { type: String, enum: ['pendent', 'pagat', 'entregat'], default: 'pendent' },
  // Comprador: guarda l'_id de l'Usuari que compra (relació 1..N); obligatori
  comprador: { type: Schema.Types.ObjectId, ref: 'Usuari', required: true },
});

// Índex sobre "comprador": fa que veure les comandes d'un usuari sigui més ràpid
comandaSchema.index({ comprador: 1 });

// Crea el model "Comanda" i l'exporta
module.exports = model('Comanda', comandaSchema);
