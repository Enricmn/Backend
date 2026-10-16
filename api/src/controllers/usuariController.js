// Importa el servei, que és qui parla de debò amb la base de dades
const usuariService = require('../services/usuariService');

// POST /api/usuaris - crea un usuari nou
const crearUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.crearUsuari(req.body); // req.body porta les dades enviades pel client
    res.status(201).json({ status: 'exito', data: usuari }); // 201 = creat correctament
  } catch (error) {
    // Si falla alguna validació del model (email duplicat, camp obligatori, etc.), arriba aquí
    res.status(400).json({ status: 'error', message: 'no se ha podido crear el usuario: ' + error.message });
  }
};

// GET /api/usuaris - retorna tots els usuaris
const obtenirUsuaris = async (req, res) => {
  try {
    const usuaris = await usuariService.obtenirUsuaris();
    res.status(200).json({ status: 'exito', data: usuaris });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'error al obtener los usuarios: ' + error.message });
  }
};

// GET /api/usuaris/:id - retorna un usuari concret
const obtenirUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.obtenirUsuari(req.params.id); // :id arriba a req.params
    if (!usuari) {
      // Si no existeix cap usuari amb aquest id, 404
      return res.status(404).json({ status: 'error', message: 'usuario no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: usuari });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'error al obtener el usuario: ' + error.message });
  }
};

// PATCH /api/usuaris/:id - actualitza un usuari
const actualitzarUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.actualitzarUsuari(req.params.id, req.body);
    if (!usuari) {
      return res.status(404).json({ status: 'error', message: 'usuario no encontrado' });
    }
    res.status(200).json({ status: 'exito', data: usuari });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'no se ha podido actualizar el usuario: ' + error.message });
  }
};

// DELETE /api/usuaris/:id - elimina un usuari
const eliminarUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.eliminarUsuari(req.params.id);
    if (!usuari) {
      return res.status(404).json({ status: 'error', message: 'usuario no encontrado' });
    }
    res.status(200).json({ status: 'exito', message: 'usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'error al eliminar el usuario: ' + error.message });
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
