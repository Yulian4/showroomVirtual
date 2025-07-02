import { Router } from "express";
import { renderIndex, renderCatalogCar, renderCatalogMotorbike, getCarsJson, getMotorbikesJson, rederDetalle, renderCliente, renderAsesor, renderProximo, renderNosotros, rederDetalleMoto } from "../controllers/index.controller.js";
import { methods as authentication } from "../controllers/authentication.controller.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

// Rutas de vistas principales
router.get("/", renderIndex);
router.get("/catalog-car", renderCatalogCar);
router.get("/catalog-motorbike", renderCatalogMotorbike);
router.get("/detalle/:id", rederDetalle);
router.get("/detalleMoto/:id", rederDetalleMoto);
router.get("/cliente",renderCliente)
router.get("/asesor",renderAsesor)
router.get("/menu-proximo",renderProximo)
router.get("/sobreNosotros",renderNosotros)
// Rutas para datos JSON
router.get("/data/cars.json", getCarsJson);
router.get("/data/motorbike.json", getMotorbikesJson);


export default router;