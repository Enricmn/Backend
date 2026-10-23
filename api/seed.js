// seed.js - crea usuaris de prova de cop per tenir dades per filtres/paginacio (4.5)
// Executar des de la carpeta api/ amb: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuari = require('./src/models/Usuari');

const usuarisFicticis = [
  { nom: 'Enric Marques', email: 'enric.marques@mail-fictici.cat', contrasenya: 'canyaEnRodaLlarga1', rol: 'client' },
  { nom: 'Pau Medina', email: 'pau.medina@mail-fictici.cat', contrasenya: 'negraComLaNitSencera2', rol: 'client' },
  { nom: 'Victor Reig', email: 'victor.reig@mail-fictici.cat', contrasenya: 'llunaPlenaDeCards3', rol: 'admin' },
  { nom: 'Oscar Rueda', email: 'oscar.rueda@mail-fictici.cat', contrasenya: 'borraSenseRastre4', rol: 'client' },
  { nom: 'Adria Blas', email: 'adria.blas@mail-fictici.cat', contrasenya: 'ventQueTotSEnduu5', rol: 'client', actiu: false },
  { nom: 'Borja Lozano', email: 'borja.lozano@mail-fictici.cat', contrasenya: 'pedraQueNoPlora6', rol: 'client' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connectat per fer el seed');

  for (const u of usuarisFicticis) {
    const existent = await Usuari.findOne({ email: u.email });
    if (existent) {
      console.log(`Ja existia: ${u.email}, salto`);
      continue;
    }
    const passwordHash = await bcrypt.hash(u.contrasenya, 10);
    await Usuari.create({
      nom: u.nom,
      email: u.email,
      passwordHash,
      rol: u.rol,
      actiu: u.actiu !== undefined ? u.actiu : true,
    });
    console.log(`Creat: ${u.email}`);
  }

  console.log('Seed acabat');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Error fent el seed:', err);
  process.exit(1);
});