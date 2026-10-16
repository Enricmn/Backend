// Importa el servei, que és qui parla de debò amb la base de dades
const recursosService = require('../services/recursosService');

// POST /api/recursos - crea un lot de recursos nou
const crearRecurs = async (req, res) => {
  try {
    const recurs = await recursosService.crearRecurs(req.body); // req.body porta les dades enviades pel client
    res.status(201).json({ status: 'exito', data: recurs }); // 201 = creat correctament
  } catch (error) {
    // Si falla alguna validació del model (camp obligatori, enum, etc.), arriba aquí
    res.status(400).json({ status: 'error', message: 'no se ha podido crear el producto: ' + error.message });
  }
};

// GET /api/recursos - retorna tots els lots de recursos
const obtenirRecursos = async (req, res) => {
  try {
    const recursos = await recursosService.obtenirRecursos();
    res.status(200).json({ status: 'exito', data: recursos });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'error al obtener los productos: ' + error.message });
  }
};

// GET /api/recursos/:id - retorna un lot de recursos concret
const obtenirRecurs = async (req, res) => {
  try {
    const recurs = await recursosService.obtenirRecurs(req.params.id); // :id arriba a req.params
    if (!recurs) {
      // Si no existeix cap recurs amb aquest id, 404
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: recurs });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'error al obtener el producto: ' + error.message });
  }
};

// PATCH /api/recursos/:id - actualitza un lot de recursos
const actualitzarRecurs = async (req, res) => {
  try {
    const recurs = await recursosService.actualitzarRecurs(req.params.id, req.body);
    if (!recurs) {
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: recurs });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'no se ha podido actualizar el producto: ' + error.message });
  }
};

// DELETE /api/recursos/:id - elimina un lot de recursos
const eliminarRecurs = async (req, res) => {
  try {
    const recurs = await recursosService.eliminarRecurs(req.params.id);
    if (!recurs) {
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(200).json({ status: 'exito', message: 'producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'error al eliminar el producto: ' + error.message });
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
