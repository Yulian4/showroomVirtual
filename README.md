# showroomVirtual

ShowroomVirtual es una plataforma web interactiva para la exhibición y gestión de catálogos de vehículos (carros y motos), con funcionalidades de administración, autenticación, chat en tiempo real y visualización detallada de modelos.

## Características

- Catálogo interactivo de carros y motos con filtros por tipo y vista previa.
- Panel de administración para gestión de asesores.
- Autenticación de usuarios (admin, asesor, cliente) con JWT.
- Chat en tiempo real entre clientes y asesores usando Socket.io.
- Diseño responsivo y moderno.
- Separación clara entre frontend (HTML, CSS, JS) y backend (Node.js, Express).

## Estructura del Proyecto

```
showroomVirtual/
│
├── public/
│   ├── assets/           # Imágenes y videos
│   ├── javaScript/       # Scripts frontend (catálogo, chat, etc.)
│   └── styles/           # Hojas de estilo CSS
│
├── src/
│   ├── controllers/      # Controladores Express
│   ├── data/             # Archivos JSON de datos (carros, motos, usuarios)
│   ├── middleware/       # Middlewares de autenticación y autorización
│   ├── routers/          # Rutas Express
│   └── views/            # Vistas HTML
│
├── .env                  # Variables de entorno
├── package.json
└── README.md
```

## Instalación

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/Yulian4/showroomVirtual.git
   cd showroomVirtual
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz con el siguiente contenido de ejemplo:
     ```
     PORT=3000
     JWT_SECRET=tu_clave_secreta
     ```

4. **Inicia el servidor en modo desarrollo:**
   ```sh
   npm run dev
   ```
   O en modo producción:
   ```sh
   npm start
   ```

5. **Abre tu navegador en** `http://localhost:3000`

## Scripts

- `npm run dev` — Inicia el servidor con nodemon para desarrollo.
- `npm start` — Inicia el servidor en modo producción.

## Tecnologías utilizadas

- **Backend:** Node.js, Express, Socket.io, JWT, dotenv
- **Frontend:** HTML5, CSS3, JavaScript
- **Autenticación:** JWT
- **Estilos:** CSS personalizado

## Autores

- [Yuliana Yate](https://github.com/Yulian4)

- [Miguel Ángel Vargas Navarro](https://github.com/Miguel-A-VN)

-[Valentina](https://github.com/valen-tina)

## Licencia

Este proyecto está bajo la licencia ISC.
