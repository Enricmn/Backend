// Importa de Mongoose el Schema (per definir l'estructura) i el model (per crear la col·lecció)
const { Schema, model } = require('mongoose');

// Esquema d'una línia de comanda: cada producte dins d'una comanda (entitat associativa)
const liniaComandaSchema = new Schema({
  // Comanda: guarda l'_id de la Comanda a la qual pertany (relació 1..N); obligatòria
  comanda: { type: Schema.Types.ObjectId, ref: 'Comanda', required: true },
  // Tipus de producte: diu de quin model és el producte (CompteRoK, RecursosRoK o BotRoK)
  tipusProducte: { type: String, required: true, enum: ['CompteRoK', 'RecursosRoK', 'BotRoK'] },
  // Producte: guarda l'_id del producte; refPath fa que Mongoose el busqui al model indicat a "tipusProducte"
  producte: { type: Schema.Types.ObjectId, refPath: 'tipusProducte', required: true },
  // Quantitat: número obligatori, com a mínim 1
  quantitat: { type: Number, required: true, min: 1 },
  // Preu unitari: número obligatori, no pot ser negatiu
  preuUnitari: { type: Number, required: true, min: 0 },
  // Comissió: el 10% del preu que es queda la plataforma; número obligatori, no negatiu
  comissio: { type: Number, required: true, min: 0 },
});

// Índex sobre "comanda": fa que trobar les línies d'una comanda sigui més ràpid
liniaComandaSchema.index({ comanda: 1 });

// Crea el model "LiniaComanda" i l'exporta
module.exports = model('LiniaComanda', liniaComandaSchema);
