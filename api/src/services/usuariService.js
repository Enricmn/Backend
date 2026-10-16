// Importa el model Usuari per poder interactuar amb la col·lecció de Mongo
const Usuari = require('../models/Usuari');

// Crea un nou usuari a la base de dades
const crearUsuari = async (dades) => {
  const nouUsuari = new Usuari(dades); // crea una instància amb les dades rebudes
  return await nouUsuari.save(); // la guarda a Mongo i retorna el document creat
};

// Retorna tots els usuaris
const obtenirUsuaris = async () => {
  return await Usuari.find(); // find() sense filtres retorna tots els documents
};

// Retorna un usuari concret per id
const obtenirUsuari = async (id) => {
  return await Usuari.findById(id); // busca pel seu _id; retorna null si no existeix
};

// Actualitza un usuari existent amb noves dades
const actualitzarUsuari = async (id, dades) => {
  // { new: true } fa que retorni el document ja actualitzat, no el d'abans
  // { runValidators: true } fa que les validacions del model (required, unique, enum...) també s'apliquin en actualitzar
  return await Usuari.findByIdAndUpdate(id, dades, { new: true, runValidators: true });
};

// Elimina un usuari per id
const eliminarUsuari = async (id) => {
  return await Usuari.findByIdAndDelete(id); // retorna el document eliminat, o null si no existia
};

// Exporta totes les funcions perquè el controlador les pugui fer servir
module.exports = {
  crearUsuari,
  obtenirUsuaris,
  obtenirUsuari,
  actualitzarUsuari,
  eliminarUsuari,
};
