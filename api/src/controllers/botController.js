// Importa el servei, que és qui parla de debò amb la base de dades
const botService = require('../services/botService');

// POST /api/bots - crea un bot nou
const crearBot = async (req, res) => {
  try {
    const bot = await botService.crearBot(req.body); // req.body porta les dades enviades pel client
    res.status(201).json({ status: 'exito', data: bot }); // 201 = creat correctament
  } catch (error) {
    // Si falla alguna validació del model (camp obligatori, enum, etc.), arriba aquí
    res.status(400).json({ status: 'error', message: 'no se ha podido crear el producto: ' + error.message });
  }
};

// GET /api/bots - retorna tots els bots
const obtenirBots = async (req, res) => {
  try {
    const bots = await botService.obtenirBots();
    res.status(200).json({ status: 'exito', data: bots });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'error al obtener los productos: ' + error.message });
  }
};

// GET /api/bots/:id - retorna un bot concret
const obtenirBot = async (req, res) => {
  try {
    const bot = await botService.obtenirBot(req.params.id); // :id arriba a req.params
    if (!bot) {
      // Si no existeix cap bot amb aquest id, 404
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: bot });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'error al obtener el producto: ' + error.message });
  }
};

// PATCH /api/bots/:id - actualitza un bot
const actualitzarBot = async (req, res) => {
  try {
    const bot = await botService.actualitzarBot(req.params.id, req.body);
    if (!bot) {
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: bot });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'no se ha podido actualizar el producto: ' + error.message });
  }
};

// DELETE /api/bots/:id - elimina un bot
const eliminarBot = async (req, res) => {
  try {
    const bot = await botService.eliminarBot(req.params.id);
    if (!bot) {
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(200).json({ status: 'exito', message: 'producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'error al eliminar el producto: ' + error.message });
  }
};

// Exporta totes les funcions perquè la ruta les pugui fer servir
module.exports = {
  crearBot,
  obtenirBots,
  obtenirBot,
  actualitzarBot,
  eliminarBot,
};
