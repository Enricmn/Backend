// Importa de Mongoose el Schema (per definir l'estructura) i el model (per crear la col·lecció)
const { Schema, model } = require('mongoose');

// Esquema d'una ressenya que un usuari escriu sobre un producte
const ressenyaSchema = new Schema({
  // Text: text obligatori
  text: { type: String, required: true },
  // Puntuació: número obligatori, entre 1 i 5
  puntuacio: { type: Number, required: true, min: 1, max: 5 },
  // Usuari: guarda l'_id de l'Usuari que escriu la ressenya (relació 1..N); obligatori
  usuari: { type: Schema.Types.ObjectId, ref: 'Usuari', required: true },
  // Tipus de producte: diu de quin model és el producte (CompteRoK, RecursosRoK o BotRoK)
  tipusProducte: { type: String, required: true, enum: ['CompteRoK', 'RecursosRoK', 'BotRoK'] },
  // Producte: guarda l'_id del producte; refPath fa que Mongoose el busqui al model indicat a "tipusProducte"
  producte: { type: Schema.Types.ObjectId, refPath: 'tipusProducte', required: true },
  // Data: si no s'indica, es posa el moment actual
  data: { type: Date, default: Date.now },
});

// Índex sobre "producte": fa que veure les ressenyes d'un producte sigui més ràpid
ressenyaSchema.index({ producte: 1 });

// Crea el model "Ressenya" i l'exporta
module.exports = model('Ressenya', ressenyaSchema);
