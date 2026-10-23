// Importa el model Categoria per poder interactuar amb la col·lecció de Mongo
const Categoria = require('../models/Categoria');

// Crea una categoria nova a la base de dades
const crearCategoria = async (dades) => {
  const novaCategoria = new Categoria(dades);
  return await novaCategoria.save();
};

// Retorna les categories aplicant filtres, ordenació i paginació
const obtenirCategories = async (opcions = {}) => {
  const { actiu, nom, ordenar, pagina = 1, limit = 10 } = opcions;

  // Construeix el filtre de Mongo a partir dels paràmetres rebuts
  const filtre = {};
  if (actiu !== undefined) filtre.actiu = actiu === 'true';
  if (nom) filtre.nom = new RegExp(nom, 'i'); // cerca parcial, sense distingir majúscules/minúscules

  // Valida que pagina i limit siguin nombres positius (limit màxim 100)
  const paginaNum = Math.max(1, parseInt(pagina) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 10));

  // Construeix la consulta i només hi afegeix el sort si realment s'ha demanat
  let consulta = Categoria.find(filtre);
  if (ordenar) {
    consulta = consulta.sort(ordenar);
  }
  consulta = consulta.skip((paginaNum - 1) * limitNum).limit(limitNum);

  // Fa la consulta i el recompte total en paral·lel
  const [categories, total] = await Promise.all([
    consulta,
    Categoria.countDocuments(filtre),
  ]);

  return {
    categories,
    pagination: {
      total,
      pagina: paginaNum,
      limit: limitNum,
      totalPagines: Math.ceil(total / limitNum),
    },
  };
};

// Retorna una categoria concreta per id
const obtenirCategoria = async (id) => {
  return await Categoria.findById(id);
};

// Actualitza una categoria existent amb noves dades
const actualitzarCategoria = async (id, dades) => {
  return await Categoria.findByIdAndUpdate(id, dades, { new: true, runValidators: true });
};

// Elimina una categoria per id
const eliminarCategoria = async (id) => {
  return await Categoria.findByIdAndDelete(id);
};

// Exporta totes les funcions perquè el controlador les pugui fer servir
module.exports = {
  crearCategoria,
  obtenirCategories,
  obtenirCategoria,
  actualitzarCategoria,
  eliminarCategoria,
};