// Importa Mongoose per poder definir l'esquema i el model
const mongoose = require('mongoose');

// Esquema d'un usuari de la plataforma (pot comprar i vendre)
const usuariSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'El nom és obligatori'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email és obligatori"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'El format de l\'email no és vàlid'],
    },
    passwordHash: {
      type: String,
      required: [true, 'La contrasenya és obligatòria'],
      select: false, // no es retorna mai en una consulta normal
    },
    rol: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
    },
    actiu: {
      type: Boolean,
      default: true, // baixa lògica: en comptes d'esborrar, es posa a false
    },
  },
  {
    timestamps: true,
  }
);

// Segona xarxa de seguretat: encara que algun dia arribi carregat, mai surt al JSON de sortida
usuariSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    return ret;
  },
});

// Crea el model "Usuari" i l'exporta
module.exports = mongoose.model('Usuari', usuariSchema);