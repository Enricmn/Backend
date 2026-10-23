// Importa Express per poder crear un "mini router" propi d'aquest recurs
const express = require('express');
const router = express.Router();

// Importa el controlador, que és qui gestiona cada petició
const categoriaController = require('../controllers/categoriaController');

// Defineix els 5 endpoints del CRUD, cadascun apuntant a la seva funció del controlador
router.get('/', categoriaController.obtenirCategories);           // GET /api/categories
router.get('/:id', categoriaController.obtenirCategoria);         // GET /api/categories/:id
router.post('/', categoriaController.crearCategoria);             // POST /api/categories
router.patch('/:id', categoriaController.actualitzarCategoria);   // PATCH /api/categories/:id
router.delete('/:id', categoriaController.eliminarCategoria);     // DELETE /api/categories/:id

// Exporta el router perquè index.js el pugui muntar
module.exports = router;
