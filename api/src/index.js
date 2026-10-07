// Carrega les variables definides al fitxer .env i les afegeix a process.env
require('dotenv').config();

// Importa la llibreria Express, el framework que farem servir per crear el servidor web
const express = require('express');

// Importa la funció connectDB que hem definit a config/db.js (Mongoose es connecta a Mongo)
const connectDB = require('./config/db');

// Crea una instància de l'aplicació Express (el nostre servidor)
const app = express();

// Middleware: permet que Express entengui el cos de les peticions en format JSON
// (necessari perquè, per exemple, les peticions POST amb dades puguin llegir-se com a objectes)
app.use(express.json());

// Executa la funció que connecta amb la base de dades MongoDB
connectDB();

// Defineix una ruta GET a l'arrel ("/") de l'API:
// quan algú visiti http://localhost:3000/, el servidor respondrà amb aquest text
app.get('/', (req, res) => res.send('API Ecommerce en marxa 🚀'));

// Defineix el port on escoltarà el servidor:
// agafa el valor de la variable PORT del .env, o fa servir 3000 per defecte si no existeix
const PORT = process.env.PORT || 3000;

// Posa el servidor a escoltar peticions al port indicat
// i mostra un missatge per consola quan arrenca correctament
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));