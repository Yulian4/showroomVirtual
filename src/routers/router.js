import { Router } from "express";
import { methods as authentication } from "../controllers/authentication.controller.js";
import { renderAdmin, getAsesores, registerAsesor } from "../controllers/admin.controller.js";
import { isAuthenticated, isAdmin, isAsesor } from "../middleware/auth.middleware.js";
import { renderIndex, renderCatalogCar, renderCatalogMotorbike, getCarsJson, getMotorbikesJson, rederDetalle, renderCliente, renderAsesor, renderProximo, renderNosotros, rederDetalleMoto } from "../controllers/index.controller.js";
import { renderRegister, renderLogin } from "../controllers/authentication.controller.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

// Login (admin y asesores)
router.get("/login", renderLogin);

router.post("/login", authentication.login);

// Vista de admin (solo admin)
router.get("/admin", isAuthenticated, isAdmin, renderAdmin);

// // API para obtener asesores (solo admin)
router.get("/api/asesores", isAuthenticated, isAdmin, getAsesores);

// // Registrar asesor (solo admin)
router.get("/register-asesor",isAuthenticated ,isAdmin, renderRegister);


router.post("/register-asesor", isAuthenticated, isAdmin, registerAsesor);

router.get("/", renderIndex);
router.get("/catalog-car", renderCatalogCar);
router.get("/catalog-motorbike", renderCatalogMotorbike);
router.get("/detalle/:id", rederDetalle);
router.get("/detalleMoto/:id", rederDetalleMoto);
router.get("/cliente",renderCliente)
router.get("/asesor",isAuthenticated,isAsesor, renderAsesor)
router.get("/menu-proximo",renderProximo)
router.get("/sobreNosotros",renderNosotros)
// Rutas para datos JSON
router.get("/data/cars.json", getCarsJson);
router.get("/data/motorbike.json", getMotorbikesJson);


export default router;