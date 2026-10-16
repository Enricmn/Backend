// Importa Express per poder crear un "mini router" propi d'aquest recurs
const express = require('express');
const router = express.Router();

// Importa el controlador, que és qui gestiona cada petició
const usuariController = require('../controllers/usuariController');

// Defineix els 5 endpoints del CRUD, cadascun apuntant a la seva funció del controlador
router.get('/', usuariController.obtenirUsuaris);          // GET /api/usuaris
router.get('/:id', usuariController.obtenirUsuari);        // GET /api/usuaris/:id
router.post('/', usuariController.crearUsuari);            // POST /api/usuaris
router.patch('/:id', usuariController.actualitzarUsuari);  // PATCH /api/usuaris/:id
router.delete('/:id', usuariController.eliminarUsuari);    // DELETE /api/usuaris/:id

// Exporta el router perquè index.js el pugui muntar
module.exports = router;
