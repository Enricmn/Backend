// Importa el model CompteRoK per poder interactuar amb la col·lecció de Mongo
const CompteRoK = require('../models/CompteRoK');

// Crea un nou compte a la base de dades
const crearCompte = async (dades) => {
  const nouCompte = new CompteRoK(dades); // crea una instància amb les dades rebudes
  return await nouCompte.save(); // la guarda a Mongo i retorna el document creat
};

// Retorna tots els comptes, amb la categoria ja "desplegada" (no només el seu id)
const obtenirComptes = async () => {
  return await CompteRoK.find().populate('categoria');
};

// Retorna un compte concret per id, amb la categoria ja "desplegada"
const obtenirCompte = async (id) => {
  return await CompteRoK.findById(id).populate('categoria'); // busca pel seu _id; retorna null si no existeix
};

// Actualitza un compte existent amb noves dades
const actualitzarCompte = async (id, dades) => {
  // { new: true } fa que retorni el document ja actualitzat, no el d'abans
  // { runValidators: true } fa que les validacions del model (required, min, enum...) també s'apliquin en actualitzar
  return await CompteRoK.findByIdAndUpdate(id, dades, { new: true, runValidators: true });
};

// Elimina un compte per id
const eliminarCompte = async (id) => {
  return await CompteRoK.findByIdAndDelete(id); // retorna el document eliminat, o null si no existia
};

// Exporta totes les funcions perquè el controlador les pugui fer servir
module.exports = {
  crearCompte,
  obtenirComptes,
  obtenirCompte,
  actualitzarCompte,
  eliminarCompte,
};