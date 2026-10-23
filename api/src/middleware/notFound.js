// Middleware per quan la ruta demanada no existeix a l'API
const notFound = (req, res) => {
  res.status(404).json({ status: 'error', message: 'ruta no encontrada' });
};

module.exports = notFound;
