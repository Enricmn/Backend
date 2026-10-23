// Importa el servei, que és qui parla de debò amb la base de dades
const recursosService = require('../services/recursosService');

// POST /api/recursos - crea un lot de recursos nou
const crearRecurs = async (req, res, next) => {
  try {
    const recurs = await recursosService.crearRecurs(req.body); // req.body porta les dades enviades pel client
    res.status(201).json({ status: 'exito', data: recurs }); // 201 = creat correctament
  } catch (error) {
    next(error); // passa l'error al gestor centralitzat
  }
};

// GET /api/recursos - retorna tots els lots de recursos
const obtenirRecursos = async (req, res, next) => {
  try {
    const recursos = await recursosService.obtenirRecursos();
    res.status(200).json({ status: 'exito', data: recursos });
  } catch (error) {
    next(error);
  }
};

// GET /api/recursos/:id - retorna un lot de recursos concret
const obtenirRecurs = async (req, res, next) => {
  try {
    const recurs = await recursosService.obtenirRecurs(req.params.id); // :id arriba a req.params
    if (!recurs) {
      // Si no existeix cap recurs amb aquest id, 404
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: recurs });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/recursos/:id - actualitza un lot de recursos
const actualitzarRecurs = async (req, res, next) => {
  try {
    const recurs = await recursosService.actualitzarRecurs(req.params.id, req.body);
    if (!recurs) {
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: recurs });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/recursos/:id - elimina un lot de recursos
const eliminarRecurs = async (req, res, next) => {
  try {
    const recurs = await recursosService.eliminarRecurs(req.params.id);
    if (!recurs) {
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(204).send(); // 204 = tot ha anat bé, no es retorna cap contingut
  } catch (error) {
    next(error);
  }
};

// Exporta totes les funcions perquè la ruta les pugui fer servir
module.exports = {
  crearRecurs,
  obtenirRecursos,
  obtenirRecurs,
  actualitzarRecurs,
  eliminarRecurs,
};