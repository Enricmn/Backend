// Importa el servei, que és qui parla de debò amb la base de dades
const compteService = require('../services/compteService');

// POST /api/comptes - crea un compte nou
const crearCompte = async (req, res, next) => {
  try {
    const compte = await compteService.crearCompte(req.body); // req.body porta les dades enviades pel client
    res.status(201).json({ status: 'exito', data: compte }); // 201 = creat correctament
  } catch (error) {
    next(error); // passa l'error al gestor centralitzat
  }
};

// GET /api/comptes - retorna tots els comptes
const obtenirComptes = async (req, res, next) => {
  try {
    const comptes = await compteService.obtenirComptes();
    res.status(200).json({ status: 'exito', data: comptes });
  } catch (error) {
    next(error);
  }
};

// GET /api/comptes/:id - retorna un compte concret
const obtenirCompte = async (req, res, next) => {
  try {
    const compte = await compteService.obtenirCompte(req.params.id); // :id arriba a req.params
    if (!compte) {
      // Si no existeix cap compte amb aquest id, 404
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: compte });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/comptes/:id - actualitza un compte
const actualitzarCompte = async (req, res, next) => {
  try {
    const compte = await compteService.actualitzarCompte(req.params.id, req.body);
    if (!compte) {
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: compte });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/comptes/:id - elimina un compte
const eliminarCompte = async (req, res, next) => {
  try {
    const compte = await compteService.eliminarCompte(req.params.id);
    if (!compte) {
      return res.status(404).json({ status: 'error', message: 'producto no encontrado' });
    }
    res.status(204).send(); // 204 = tot ha anat bé, no es retorna cap contingut
  } catch (error) {
    next(error);
  }
};

// Exporta totes les funcions perquè la ruta les pugui fer servir
module.exports = {
  crearCompte,
  obtenirComptes,
  obtenirCompte,
  actualitzarCompte,
  eliminarCompte,
};