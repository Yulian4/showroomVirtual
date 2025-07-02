import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controlador para la página principal
export function renderIndex(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
}
export function renderCliente(req,res){
    res.sendFile(path.join(__dirname,"../views/cliente.html"))
}

export function renderAsesor(req,res){
    res.sendFile(path.join(__dirname,"../views/asesor.html"))
}

export function renderProximo(req,res){
    res.sendFile(path.join(__dirname,"../views/menu-proximo.html"))
}
export function renderNosotros(req,res){
    res.sendFile(path.join(__dirname,"../views/sobreNosotros.html"))
}
// Controlador para el catálogo de carros
export function renderCatalogCar(req, res) {
    res.sendFile(path.join(__dirname, "../views/catalogo-carros.html"));
}

// Controlador para el catálogo de motos
export function renderCatalogMotorbike(req, res) {
    res.sendFile(path.join(__dirname, "../views/catalogo-motos.html"));
}
export function rederDetalle(req, res) {
    res.sendFile(path.join(__dirname, "../views/detalleCarro.html"));
}
export function rederDetalleMoto(req, res) {
    res.sendFile(path.join(__dirname, "../views/detalleMoto.html"));
}

// Controlador para enviar el JSON de carros
export function getCarsJson(req, res) {
    const carsPath = path.join(__dirname, "../data/cars.json");
    if (fs.existsSync(carsPath)) {
        res.sendFile(carsPath);
    } else {
        res.status(404).json({ error: "Archivo cars.json no encontrado" });
    }
}

// Controlador para enviar el JSON de motos
export function getMotorbikesJson(req, res) {
    const motosPath = path.join(__dirname, "../data/motorbike.json");
    if (fs.existsSync(motosPath)) {
        res.sendFile(motosPath);
    } else {
        res.status(404).json({ error: "Archivo motorbike.json no encontrado" });
    }
}
