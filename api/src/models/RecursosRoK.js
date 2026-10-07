// Importa de Mongoose el Schema (per definir l'estructura) i el model (per crear la col·lecció)
const { Schema, model } = require('mongoose');

// Esquema d'un lot de recursos de Rise of Kingdoms que es posa a la venda
const recursosRoKSchema = new Schema({
  // Tipus de recurs: obligatori, només "aliments", "fusta", "pedra" o "or"
  tipusRecurs: { type: String, required: true, enum: ['aliments', 'fusta', 'pedra', 'or'] },
  // Descripció: text opcional
  descripcio: String,
  // Quantitat: número obligatori, com a mínim 1
  quantitat: { type: Number, required: true, min: 1 },
  // Preu: número obligatori, no pot ser negatiu
  preu: { type: Number, required: true, min: 0 },
  // Regne: obligatori, format KD + números (ex: KD1220)
  regne: { type: String, required: true, match: /^KD\d{1,4}$/ },
  // Categoria: guarda l'_id d'una Categoria (relació 1..N); obligatòria
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
  // Venedor: guarda l'_id de l'Usuari que el ven (relació 1..N); obligatori
  venedor: { type: Schema.Types.ObjectId, ref: 'Usuari', required: true },
});

// Índex sobre "tipusRecurs": fa que cercar per tipus de recurs sigui més ràpid
recursosRoKSchema.index({ tipusRecurs: 1 });

// Crea el model "RecursosRoK" i l'exporta
module.exports = model('RecursosRoK', recursosRoKSchema);
