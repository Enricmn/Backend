// Importa Express per poder crear un "mini router" propi d'aquest recurs
const express = require('express');
const router = express.Router();

// Importa el controlador, que és qui gestiona cada petició
const botController = require('../controllers/botController');

// Defineix els 5 endpoints del CRUD, cadascun apuntant a la seva funció del controlador
router.get('/', botController.obtenirBots);          // GET /api/bots
router.get('/:id', botController.obtenirBot);        // GET /api/bots/:id
router.post('/', botController.crearBot);            // POST /api/bots
router.patch('/:id', botController.actualitzarBot);  // PATCH /api/bots/:id
router.delete('/:id', botController.eliminarBot);    // DELETE /api/bots/:id

// Exporta el router perquè index.js el pugui muntar
module.exports = router;
