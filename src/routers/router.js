import { Router } from "express";
import { renderIndex, renderCatalogCar, renderCatalogMotorbike, getCarsJson, getMotorbikesJson } from "../controllers/index.controller.js";
import { methods as authentication } from "../controllers/authentication.controller.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

// Rutas de vistas principales
router.get("/", renderIndex);
router.get("/catalog-car", renderCatalogCar);
router.get("/catalog-motorbike", renderCatalogMotorbike);

// Rutas para datos JSON
router.get("/data/cars.json", getCarsJson);
router.get("/data/motorbike.json", getMotorbikesJson);

export default router;