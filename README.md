# E-commerce Full Stack

Tecnologías: Node.js, Express, MongoDB, Docker

Autor: Enric Marquès

## Cómo ejecutar el proyecto

1. Clonar el repositorio:
   git clone https://github.com/Enricmn/Backend.git

2. Entrar en la carpeta:
   cd Backend

3. Instalar las dependencias:
   npm install

4. Configurar las variables de entorno (archivo .env):
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/ecommerce

5. Arrancar MongoDB (si usas Docker):
   docker run -d -p 27017:27017 --name mongo mongo

6. Arrancar el servidor:
   npm run dev

7. El servidor quedará escuchando en:
   http://localhost:3000