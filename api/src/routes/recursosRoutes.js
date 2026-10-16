// Importa Express per poder crear un "mini router" propi d'aquest recurs
const express = require('express');
const router = express.Router();

// Importa el controlador, que és qui gestiona cada petició
const recursosController = require('../controllers/recursosController');

// Defineix els 5 endpoints del CRUD, cadascun apuntant a la seva funció del controlador
router.get('/', recursosController.obtenirRecursos);          // GET /api/recursos
router.get('/:id', recursosController.obtenirRecurs);         // GET /api/recursos/:id
router.post('/', recursosController.crearRecurs);             // POST /api/recursos
router.patch('/:id', recursosController.actualitzarRecurs);   // PATCH /api/recursos/:id
router.delete('/:id', recursosController.eliminarRecurs);     // DELETE /api/recursos/:id

// Exporta el router perquè index.js el pugui muntar
module.exports = router;
