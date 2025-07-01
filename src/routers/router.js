import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { methods as authentication } from "../controllers/authentication.controller.js";
import { validation } from "../middleware/auth.middleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

// API Auth
router.post("/register", validation.register, authentication.register);
router.post("/login", validation.login, authentication.login);

// Vistas
router.get("/", (req, res) => {  
    res.sendFile(path.join(__dirname, "../views/index.html"));
});
router.get("/catalog", (req, res) => {  
    res.sendFile(path.join(__dirname, "../views/catalogo-carros.html"));
});
router.get("/register", (req, res) => {  
    res.sendFile(path.join(__dirname, "../views/register.html"));
});
router.get("/login", (req, res) => {  
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

// Datos JSON
router.get("/data/cars.json", (req, res) => {
    res.sendFile(path.join(__dirname, "../data/cars.json"));
});
router.get("/data/users.json", (req, res) => {
    res.sendFile(path.join(__dirname, "../data/users.json"));
});

export default router;