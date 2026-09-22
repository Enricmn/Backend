# E-commerce Full Stack

Tecnologías: Node.js, Express, MongoDB, Docker

Autor: Enric Marquès

## Descripción

Backend de una aplicación de e-commerce, desarrollado con Node.js y Express, que utiliza MongoDB como base de datos. La base de datos se ejecuta en un contenedor Docker, gestionado con Docker Compose, para facilitar su despliegue en cualquier entorno.

## Requisitos previos

- Node.js y npm instalados
- Docker Desktop instalado y en ejecución
- Git instalado

## Cómo ejecutar el proyecto

1. **Clonar el repositorio:**

   git clone https://github.com/Enricmn/Backend.git

2. **Entrar en la carpeta del proyecto:**

   cd Backend

3. **Instalar las dependencias del proyecto:**

   npm install

4. **Crear el archivo `.gitignore`.**

   En la raíz de `Backend/`, crea un archivo llamado `.gitignore` con el siguiente contenido:

   node_modules/
   Docker/.env

   Este archivo evita que Git suba a GitHub archivos que no deben compartirse, como las dependencias del proyecto (`node_modules/`) o las credenciales de MongoDB (`Docker/.env`).

5. **Configurar las credenciales de MongoDB para Docker.**

   Dentro de la carpeta `Backend/Docker/`, crea un archivo `.env` (no se sube a GitHub gracias al `.gitignore` del paso anterior) con estas dos variables, sustituyendo `<usuario>` y `<contraseña>` por tus propias credenciales:

   MONGO_INITDB_ROOT_USERNAME=<usuario>
   MONGO_INITDB_ROOT_PASSWORD=<contraseña>

   Ejemplo orientativo (no son las credenciales reales del proyecto):

   MONGO_INITDB_ROOT_USERNAME=usuario_ejemplo
   MONGO_INITDB_ROOT_PASSWORD=contraseña_ejemplo

   Estas variables las lee el `docker-compose.yml` para crear el usuario administrador de MongoDB la primera vez que se levanta el contenedor.

6. **Arrancar MongoDB con Docker Compose.**

   Desde la carpeta `Backend/Docker/`, ejecuta:

   cd Docker
   docker compose up -d

   Esto crea y arranca un contenedor llamado `ecommerce-mongo`, expuesto en el puerto `27017`, con los datos guardados de forma persistente en un volumen Docker (`mongo_data`), de modo que no se pierden aunque el contenedor se reinicie o se elimine.

7. **Comprobar que MongoDB es accesible**

   Puedes verificar la conexión con MongoDB Compass usando la siguiente URI, sustituyendo `<usuario>` y `<contraseña>` por tus credenciales:

   mongodb://<usuario>:<contraseña>@localhost:27017/

## Estructura del proyecto

Backend/
├── .gitignore       
├── README.md
└── Docker/
    ├── docker-compose.yml
    └── .env            