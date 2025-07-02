import { Router } from "express";
import { methods as authentication } from "../controllers/authentication.controller.js";
import { renderAdmin, getAsesores, registerAsesor } from "../controllers/admin.controller.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Login (admin y asesores)
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});
router.post("/login", authentication.login);

// Vista de admin (solo admin)
router.get("/admin", isAuthenticated, isAdmin, renderAdmin);

// API para obtener asesores (solo admin)
router.get("/api/asesores", isAuthenticated, isAdmin, getAsesores);

// Registrar asesor (solo admin)
router.get("/register-asesor", isAuthenticated, isAdmin, renderRegister);

router.post("/register-asesor", isAuthenticated, isAdmin, registerAsesor);

export default router;