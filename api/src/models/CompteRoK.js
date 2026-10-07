// Importa de Mongoose el Schema (per definir l'estructura) i el model (per crear la col·lecció)
const { Schema, model } = require('mongoose');

// Esquema d'un compte de Rise of Kingdoms que es posa a la venda
const compteRoKSchema = new Schema({
  // Descripció: text obligatori
  descripcio: { type: String, required: true },
  // Plataforma: obligatòria, només "iOS" o "Android"
  plataforma: { type: String, required: true, enum: ['iOS', 'Android'] },
  // Regne: obligatori, ha de tenir el format KD + números (ex: KD1220)
  regne: { type: String, required: true, match: /^KD\d{1,4}$/ },
  // Poder: número obligatori, no pot ser negatiu
  poder: { type: Number, required: true, min: 0 },
  // Nivell VIP: número obligatori, entre 0 i 20
  nivellVIP: { type: Number, required: true, min: 0, max: 20 },
  // Nombre de comandants llegendaris: número obligatori, no pot ser negatiu
  numComandantsLlegendaris: { type: Number, required: true, min: 0 },
  // Captures de pantalla: llista d'enllaços (text); és opcional
  capturesPantalla: [String],
  // Preu: número obligatori
  preu: {
    type: Number, // ha de ser un número
    required: true, // no es pot deixar buit
    // Validació personalitzada: el preu ha de ser major que 0
    validate: { validator: (v) => v > 0, message: 'El preu ha de ser major que 0' },
  },
  // Estat: només "disponible" o "venuda"; si no s'indica, és "disponible"
  estat: { type: String, enum: ['disponible', 'venuda'], default: 'disponible' },
  // Categoria: guarda l'_id d'una Categoria (relació 1..N); obligatòria
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
  // Venedor: guarda l'_id de l'Usuari que el ven (relació 1..N); obligatori
  venedor: { type: Schema.Types.ObjectId, ref: 'Usuari', required: true },
});

// Índex sobre "regne": fa que cercar comptes d'un regne sigui més ràpid
compteRoKSchema.index({ regne: 1 });

// Crea el model "CompteRoK" i l'exporta
module.exports = model('CompteRoK', compteRoKSchema);
