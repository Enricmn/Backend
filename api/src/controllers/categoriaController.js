// Importa el servei, que és qui parla de debò amb la base de dades
const categoriaService = require('../services/categoriaService');

// POST /api/categories - crea una categoria nova
const crearCategoria = async (req, res, next) => {
  try {
    const categoria = await categoriaService.crearCategoria(req.body);
    res.status(201).json({ status: 'exito', data: categoria });
  } catch (error) {
    next(error); // passa l'error al gestor centralitzat
  }
};

// GET /api/categories - retorna totes les categories (admet ?actiu, ?nom, ?ordenar, ?pagina, ?limit)
const obtenirCategories = async (req, res, next) => {
  try {
    const { categories, pagination } = await categoriaService.obtenirCategories(req.query);
    res.status(200).json({ status: 'exito', data: categories, pagination });
  } catch (error) {
    next(error);
  }
};

// GET /api/categories/:id - retorna una categoria concreta
const obtenirCategoria = async (req, res, next) => {
  try {
    const categoria = await categoriaService.obtenirCategoria(req.params.id);
    if (!categoria) {
      return res.status(404).json({ status: 'error', message: 'categoria no encontrada' });
    }
    res.status(200).json({ status: 'exito', data: categoria });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/categories/:id - actualitza una categoria
const actualitzarCategoria = async (req, res, next) => {
  try {
    const categoria = await categoriaService.actualitzarCategoria(req.params.id, req.body);
    if (!categoria) {
      return res.status(404).json({ status: 'error', message: 'categoria no encontrada' });
    }
    res.status(200).json({ status: 'exito', data: categoria });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/categories/:id - elimina una categoria
const eliminarCategoria = async (req, res, next) => {
  try {
    const categoria = await categoriaService.eliminarCategoria(req.params.id);
    if (!categoria) {
      return res.status(404).json({ status: 'error', message: 'categoria no encontrada' });
    }
    res.status(204).send(); // 204 = tot ha anat bé, no es retorna cap contingut
  } catch (error) {
    next(error);
  }
};

// Exporta totes les funcions perquè la ruta les pugui fer servir
module.exports = {
  crearCategoria,
  obtenirCategories,
  obtenirCategoria,
  actualitzarCategoria,
  eliminarCategoria,
};