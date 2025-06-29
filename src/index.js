import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routers/router.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("port", 4000);

// Middlewares
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas de vistas
app.get("/", (req, res) => {  
  res.sendFile(path.join(__dirname, "views/index.html"));
});
app.get("/catalog", (req, res) => {  
  res.sendFile(path.join(__dirname, "views/catalogo-carros.html"));
});
app.get("/register", (req, res) => {  
  res.sendFile(path.join(__dirname, "views/register.html"));
});
app.get("/login", (req, res) => {  
  res.sendFile(path.join(__dirname, "views/login.html"));
});

// Ruta para el JSON de autos
app.get("/data/cars.json", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/data/cars.json"));
});
app.get("/data/users.json", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/data/users.json"));
});

// Rutas de autenticación (API)
app.use("/api", authRouter);

app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
  console.log(`http://localhost:${app.get("port")}`);
});