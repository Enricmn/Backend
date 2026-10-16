// Carrega les variables d'entorn definides al fitxer .env (PORT, MONGO_URI, etc.)
require('dotenv').config();

// Importa Express, el framework que farem servir per crear el servidor i l'API
const express = require('express');

// Importa la funció que connecta amb MongoDB (definida a config/db.js)
const connectDB = require('./config/db');

// Importa les rutes de cada entitat, cadascuna amb el seu CRUD complet
const compteRoutes = require('./routes/compteRoutes');      // rutes de CompteRoK
const recursosRoutes = require('./routes/recursosRoutes');  // rutes de RecursosRoK
const botRoutes = require('./routes/botRoutes');             // rutes de BotRoK
const usuariRoutes = require('./routes/usuariRoutes');       // rutes d'Usuari

// Crea l'aplicació Express
const app = express();

// Middleware que permet llegir el body de les peticions en format JSON (req.body)
app.use(express.json());

// Connecta amb la base de dades MongoDB
connectDB();

// Defineix una ruta GET a l'arrel ("/") de l'API:
// quan algú visiti http://localhost:3000/, el servidor respondrà amb aquest text
app.get('/', (req, res) => res.send('API Ecommerce en marxa 🚀'));

// Munta les rutes de cada entitat, cadascuna sota el seu propi prefix
app.use('/api/comptes', compteRoutes);
app.use('/api/recursos', recursosRoutes);
app.use('/api/bots', botRoutes);
app.use('/api/usuaris', usuariRoutes);

// Defineix el port on escoltarà el servidor:
// agafa el valor de la variable PORT del .env, o fa servir 3000 per defecte si no existeix
const PORT = process.env.PORT || 3000;

// Posa el servidor a escoltar peticions al port indicat
// i mostra un missatge per consola quan arrenca correctament
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));