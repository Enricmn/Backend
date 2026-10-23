// Importa bcrypt (per xifrar la contrasenya) i el model Usuari
const bcrypt = require('bcrypt');
const Usuari = require('../models/Usuari');

// Crea un nou usuari a la base de dades, xifrant la contrasenya abans de guardar-la
const crearUsuari = async (dades) => {
  const { contrasenya, ...resta } = dades;
  const passwordHash = await bcrypt.hash(contrasenya, 10);
  const nouUsuari = new Usuari({ ...resta, passwordHash });
  return await nouUsuari.save();
};

// Retorna els usuaris aplicant filtres, ordenació i paginació
const obtenirUsuaris = async (opcions = {}) => {
  const { actiu, nom, ordenar, pagina = 1, limit = 10 } = opcions;

  // Construeix el filtre de Mongo a partir dels paràmetres rebuts
  const filtre = {};
  if (actiu !== undefined) filtre.actiu = actiu === 'true';
  if (nom) filtre.nom = new RegExp(nom, 'i'); // cerca parcial, sense distingir majúscules/minúscules

  // Valida que pagina i limit siguin nombres positius (limit màxim 100)
  const paginaNum = Math.max(1, parseInt(pagina) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 10));

  // Construeix la consulta i només hi afegeix el sort si realment s'ha demanat
  let consulta = Usuari.find(filtre);
  if (ordenar) {
    consulta = consulta.sort(ordenar);
  }
  consulta = consulta.skip((paginaNum - 1) * limitNum).limit(limitNum);

  // Fa la consulta i el recompte total en paral·lel
  const [usuaris, total] = await Promise.all([
    consulta,
    Usuari.countDocuments(filtre),
  ]);

  return {
    usuaris,
    pagination: {
      total,
      pagina: paginaNum,
      limit: limitNum,
      totalPagines: Math.ceil(total / limitNum),
    },
  };
};

// Retorna un usuari concret per id
const obtenirUsuari = async (id) => {
  return await Usuari.findById(id);
};

// Actualitza un usuari existent; si ve una contrasenya nova, la xifra abans de guardar-la
const actualitzarUsuari = async (id, dades) => {
  const canvis = { ...dades };
  if (canvis.contrasenya) {
    canvis.passwordHash = await bcrypt.hash(canvis.contrasenya, 10);
    delete canvis.contrasenya;
  }
  return await Usuari.findByIdAndUpdate(id, canvis, { new: true, runValidators: true });
};

// Desactiva un usuari (baixa lògica): mai s'esborra el document de debò
const eliminarUsuari = async (id) => {
  return await Usuari.findByIdAndUpdate(id, { actiu: false }, { new: true });
};

// Exporta totes les funcions perquè el controlador les pugui fer servir
module.exports = {
  crearUsuari,
  obtenirUsuaris,
  obtenirUsuari,
  actualitzarUsuari,
  eliminarUsuari,
};