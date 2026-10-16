// Importa el model RecursosRoK per poder interactuar amb la col·lecció de Mongo
const RecursosRoK = require('../models/RecursosRoK');

// Crea un nou lot de recursos a la base de dades
const crearRecurs = async (dades) => {
  const nouRecurs = new RecursosRoK(dades); // crea una instància amb les dades rebudes
  return await nouRecurs.save(); // la guarda a Mongo i retorna el document creat
};

// Retorna tots els lots de recursos
const obtenirRecursos = async () => {
  return await RecursosRoK.find(); // find() sense filtres retorna tots els documents
};

// Retorna un lot de recursos concret per id
const obtenirRecurs = async (id) => {
  return await RecursosRoK.findById(id); // busca pel seu _id; retorna null si no existeix
};

// Actualitza un lot de recursos existent amb noves dades
const actualitzarRecurs = async (id, dades) => {
  // { new: true } fa que retorni el document ja actualitzat, no el d'abans
  // { runValidators: true } fa que les validacions del model (required, min, enum...) també s'apliquin en actualitzar
  return await RecursosRoK.findByIdAndUpdate(id, dades, { new: true, runValidators: true });
};

// Elimina un lot de recursos per id
const eliminarRecurs = async (id) => {
  return await RecursosRoK.findByIdAndDelete(id); // retorna el document eliminat, o null si no existia
};

// Exporta totes les funcions perquè el controlador les pugui fer servir
module.exports = {
  crearRecurs,
  obtenirRecursos,
  obtenirRecurs,
  actualitzarRecurs,
  eliminarRecurs,
};
