// Importa el servei, que és qui parla amb la base de dades (i ara també qui xifra la contrasenya)
const usuariService = require('../services/usuariService');

// POST /api/usuaris - crea un usuari nou
const crearUsuari = async (req, res, next) => {
  try {
    const { nom, email, contrasenya } = req.body;

    // Això no és un error de la base de dades, és una regla de negoci: es comprova abans, no per next(error)
    if (!contrasenya || contrasenya.length < 12) {
      return res.status(422).json({ status: 'error', message: 'la contrasenya ha de tener al menos 12 caracteres' });
    }

    const usuari = await usuariService.crearUsuari({ nom, email, contrasenya, rol: 'client', actiu: true });
    res.status(201).json({ status: 'exito', data: usuari });
  } catch (error) {
    next(error); // passa l'error al gestor centralitzat
  }
};

// GET /api/usuaris - retorna tots els usuaris (admet ?actiu, ?nom, ?ordenar, ?pagina, ?limit)
const obtenirUsuaris = async (req, res, next) => {
  try {
    const { usuaris, pagination } = await usuariService.obtenirUsuaris(req.query);
    res.status(200).json({ status: 'exito', data: usuaris, pagination });
  } catch (error) {
    next(error);
  }
};

// GET /api/usuaris/:id - retorna un usuari concret
const obtenirUsuari = async (req, res, next) => {
  try {
    const usuari = await usuariService.obtenirUsuari(req.params.id);
    if (!usuari) {
      return res.status(404).json({ status: 'error', message: 'usuario no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: usuari });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/usuaris/:id - actualitza un usuari
const actualitzarUsuari = async (req, res, next) => {
  try {
    const dades = { ...req.body };

    if (dades.contrasenya && dades.contrasenya.length < 12) {
      return res.status(422).json({ status: 'error', message: 'la contrasenya ha de tener al menos 12 caracteres' });
    }

    // No es permet canviar el rol des d'aquesta ruta
    delete dades.rol;

    const usuari = await usuariService.actualitzarUsuari(req.params.id, dades);
    if (!usuari) {
      return res.status(404).json({ status: 'error', message: 'usuario no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: usuari });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/usuaris/:id - baixa lògica (actiu = false), no esborra el document
const eliminarUsuari = async (req, res, next) => {
  try {
    const usuari = await usuariService.eliminarUsuari(req.params.id);
    if (!usuari) {
      return res.status(404).json({ status: 'error', message: 'usuario no encontrado' });
    }
    res.status(200).json({ status: 'exito', message: 'usuario desactivado correctamente' });
  } catch (error) {
    next(error);
  }
};

// Exporta totes les funcions perquè la ruta les pugui fer servir
module.exports = {
  crearUsuari,
  obtenirUsuaris,
  obtenirUsuari,
  actualitzarUsuari,
  eliminarUsuari,
};