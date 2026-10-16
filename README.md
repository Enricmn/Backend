E-commerce Full Stack

Tecnologías: Node.js, Express, MongoDB, Docker

Autor: Enric Marquès

Descripción

Backend de una aplicación de e-commerce (marketplace de cuentas, recursos y bots de Rise of Kingdoms), desarrollado con Node.js y Express, siguiendo una arquitectura en capas (rutas, controladores, servicios y modelos). Utiliza MongoDB como base de datos, mediante Mongoose. La base de datos se ejecuta en un contenedor Docker, gestionado con Docker Compose, para facilitar su despliegue en cualquier entorno.

Requisitos previos
Node.js y npm instalados
Docker Desktop instalado y en ejecución
Git instalado
Cómo ejecutar el proyecto
Clonar el repositorio: git clone https://github.com/Enricmn/Backend.git
Entrar en la carpeta del proyecto: cd Backend
Configurar las credenciales de MongoDB para Docker. Dentro de la carpeta Backend/Docker/, crea un archivo .env (no se sube a GitHub gracias al .gitignore) con estas dos variables, sustituyendo <usuario> y <contraseña> por tus propias credenciales: MONGO_INITDB_ROOT_USERNAME=<usuario>
MONGO_INITDB_ROOT_PASSWORD=<contraseña> Ejemplo orientativo (no son las credenciales reales del proyecto): MONGO_INITDB_ROOT_USERNAME=usuario_ejemplo
MONGO_INITDB_ROOT_PASSWORD=contraseña_ejemplo Estas variables las lee el docker-compose.yml para crear el usuario administrador de MongoDB la primera vez que se levanta el contenedor.
Arrancar MongoDB con Docker Compose. Desde la carpeta Backend/Docker/, ejecuta: cd Docker
docker compose up -d Esto crea y arranca un contenedor llamado ecommerce-mongo, expuesto en el puerto 27017, con los datos guardados de forma persistente en un volumen Docker (mongo_data), de modo que no se pierden aunque el contenedor se reinicie o se elimine.
Configurar las variables de entorno de la API. Dentro de la carpeta Backend/api/, crea un archivo .env (tampoco se sube a GitHub) con estas dos variables, usando las mismas credenciales que pusiste en el paso 3: PORT=3000
MONGO_URI=mongodb://<usuario>:<contraseña>@localhost:27017/ecommerce?authSource=admin Ejemplo orientativo: PORT=3000
MONGO_URI=mongodb://usuario_ejemplo:contraseña_ejemplo@localhost:27017/ecommerce?authSource=admin
Instalar las dependencias de la API. Desde la carpeta Backend/api/, ejecuta: cd api
npm install
Arrancar el servidor. Desde la carpeta Backend/api/, ejecuta: npm run dev Si todo va bien, en la consola verás los mensajes “MongoDB connectat correctament” y “Servidor escoltant al port 3000”.
Comprobar que la API funciona. Abre en el navegador (o con Postman) la siguiente dirección: http://localhost:3000/ Debería responder con el texto “API Ecommerce en marxa 🚀”.
(Opcional) Comprobar MongoDB con Compass. Puedes verificar la conexión con MongoDB Compass usando la siguiente URI, sustituyendo <usuario> y <contraseña> por tus credenciales: mongodb://<usuario>:<contraseña>@localhost:27017/
Endpoints disponibles

La API expone un CRUD completo (crear, consultar, actualizar y eliminar) para estas entidades:

Usuarios: GET /api/usuaris · GET /api/usuaris/:id · POST /api/usuaris · PATCH /api/usuaris/:id · DELETE /api/usuaris/:id

Cuentas de RoK: GET /api/comptes · GET /api/comptes/:id · POST /api/comptes · PATCH /api/comptes/:id · DELETE /api/comptes/:id

Recursos de RoK: GET /api/recursos · GET /api/recursos/:id · POST /api/recursos · PATCH /api/recursos/:id · DELETE /api/recursos/:id

Bots de RoK: GET /api/bots · GET /api/bots/:id · POST /api/bots · PATCH /api/bots/:id · DELETE /api/bots/:id

Documentación del proyecto

Dentro de la carpeta Docs/ encontrarás:

Adrs/: las decisiones de arquitectura tomadas durante el proyecto (ADR-001: elección de la base de datos, ADR-002: estructura del repositorio).
diagrams/: el diagrama de dominio del proyecto (entidades, atributos y relaciones).
Estructura del proyecto

Backend/
├── .gitignore
├── README.md
├── Docker/
│ ├── docker-compose.yml
│ └── .env
├── Docs/
│ ├── Adrs/
│ │ ├── ADR-001-eleccio-base-de-dades.md
│ │ └── ADR-002-estructura-inicial-projecte.md
│ └── diagrams/
│ ├── drawROK.drawio
│ └── drawROK.png
└── api/
├── .env
├── package.json
└── src/
├── index.js
├── config/
│ └── db.js
├── models/
│ ├── Usuari.js
│ ├── Categoria.js
│ ├── CompteRoK.js
│ ├── RecursosRoK.js
│ ├── BotRoK.js
│ ├── Comanda.js
│ ├── LiniaComanda.js
│ ├── Pagament.js
│ └── Ressenya.js
├── routes/
│ ├── compteRoutes.js
│ ├── recursosRoutes.js
│ ├── botRoutes.js
│ └── usuariRoutes.js
├── controllers/
│ ├── compteController.js
│ ├── recursosController.js
│ ├── botController.js
│ └── usuariController.js
└── services/
├── compteService.js
├── recursosService.js
├── botService.js
└── usuariService.js