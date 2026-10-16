// Importa Express per poder crear un "mini router" propi d'aquest recurs
const express = require('express');
const router = express.Router();

// Importa el controlador, que és qui gestiona cada petició
const compteController = require('../controllers/compteController');

// Defineix els 5 endpoints del CRUD, cadascun apuntant a la seva funció del controlador
router.get('/', compteController.obtenirComptes);          // GET /api/comptes
router.get('/:id', compteController.obtenirCompte);        // GET /api/comptes/:id
router.post('/', compteController.crearCompte);            // POST /api/comptes
router.patch('/:id', compteController.actualitzarCompte);  // PATCH /api/comptes/:id
router.delete('/:id', compteController.eliminarCompte);    // DELETE /api/comptes/:id

// Exporta el router perquè index.js el pugui muntar
module.exports = router;
