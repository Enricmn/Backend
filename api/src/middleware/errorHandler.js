// Middleware que captura TOTS els errors de l'API en un sol lloc
// (s'ha de declarar amb 4 paràmetres perquè Express el reconegui com a gestor d'errors)
const errorHandler = (error, req, res, next) => {
  // Duplicat: un camp "unique" ja existia (slug, email...)
  if (error.code === 11000) {
    const camp = Object.keys(error.keyPattern || {})[0] || 'campo';
    return res.status(409).json({
      status: 'error',
      message: `ya existe un registro con ese ${camp}`,
    });
  }

  // Validació de Mongoose: falta un camp obligatori, no compleix l'enum, etc.
  if (error.name === 'ValidationError') {
    const detalles = Object.values(error.errors).map((e) => e.message);
    return res.status(422).json({
      status: 'error',
      message: 'los datos enviados no son válidos',
      detalles,
    });
  }

  // L'id de la URL no té el format d'un ObjectId vàlid
  if (error.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      message: 'el id proporcionado no es válido',
    });
  }

  // Qualsevol altre error no previst
  console.error(error);
  res.status(500).json({
    status: 'error',
    message: 'ha ocurrido un error inesperado en el servidor',
  });
};

module.exports = errorHandler;
