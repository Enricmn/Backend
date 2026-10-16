// Importa el model BotRoK per poder interactuar amb la col·lecció de Mongo
const BotRoK = require('../models/BotRoK');

// Crea un nou bot a la base de dades
const crearBot = async (dades) => {
  const nouBot = new BotRoK(dades); // crea una instància amb les dades rebudes
  return await nouBot.save(); // la guarda a Mongo i retorna el document creat
};

// Retorna tots els bots
const obtenirBots = async () => {
  return await BotRoK.find(); // find() sense filtres retorna tots els documents
};

// Retorna un bot concret per id
const obtenirBot = async (id) => {
  return await BotRoK.findById(id); // busca pel seu _id; retorna null si no existeix
};

// Actualitza un bot existent amb noves dades
const actualitzarBot = async (id, dades) => {
  // { new: true } fa que retorni el document ja actualitzat, no el d'abans
  // { runValidators: true } fa que les validacions del model (required, min, enum...) també s'apliquin en actualitzar
  return await BotRoK.findByIdAndUpdate(id, dades, { new: true, runValidators: true });
};

// Elimina un bot per id
const eliminarBot = async (id) => {
  return await BotRoK.findByIdAndDelete(id); // retorna el document eliminat, o null si no existia
};

// Exporta totes les funcions perquè el controlador les pugui fer servir
module.exports = {
  crearBot,
  obtenirBots,
  obtenirBot,
  actualitzarBot,
  eliminarBot,
};
