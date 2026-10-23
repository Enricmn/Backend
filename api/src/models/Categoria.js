// Importa Mongoose per poder definir l'esquema i el model
const mongoose = require('mongoose');

// Esquema d'una categoria de producte
const categoriaSchema = new mongoose.Schema(
  {
    // Nom: text obligatori, únic i només pot ser "compte", "recursos" o "bots" (els 3 tipus reals de producte)
    nom: {
      type: String,
      required: [true, 'El nom de la categoria és obligatori'],
      unique: true,
      enum: ['compte', 'recursos', 'bots'],
    },
    slug: {
      type: String,
      required: [true, 'El slug és obligatori'],
      unique: true, // crea un índex únic a Mongo, no és una validació de Mongoose
      trim: true,
      lowercase: true,
    },
    descripcio: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripció no pot passar de 500 caràcters'],
    },
    actiu: {
      type: Boolean,
      default: true, // una categoria nova sempre comença activa
    },
  },
  {
    timestamps: true, // afegeix createdAt i updatedAt automàticament
  }
);

// Crea el model "Categoria" i l'exporta
module.exports = mongoose.model('Categoria', categoriaSchema);