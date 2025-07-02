import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersPath = path.join(__dirname, "../data/users.json");

/**
 * Renderiza la vista de administración (lista de asesores).
 */
export function renderAdmin(req, res) {
    res.sendFile(path.join(__dirname, "../views/admin.html"));
}

/**
 * Devuelve la lista de asesores en formato JSON.
 */
export function getAsesores(req, res) {
    let users = [];
    try {
        users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    } catch (e) {
        users = [];
    }
    // Filtra solo los asesores
    const asesores = users.filter(u => u.role === "asesor");
    res.json(asesores);
}

/**
 * Permite al admin registrar un nuevo asesor.
 * Solo el admin puede acceder a esta ruta.
 */
export async function registerAsesor(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "Error",
            errors: errors.array()
        });
    }

    const { name, email, password } = req.body;

    let users = [];
    try {
        users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    } catch (e) {
        users = [];
    }

    // Verifica si ya existe un asesor con ese email
    const exists = users.find(u => u.email === email);
    if (exists) {
        return res.status(400).json({
            status: "Error",
            errors: [{ param: "email", msg: "El asesor ya existe" }]
        });
    }

    // Hashea la contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Crea el nuevo asesor
    const newAsesor = {
        id: uuidv4(),
        name,
        email,
        password: hashPassword,
        role: "asesor"
    };

    users.push(newAsesor);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");

    return res.status(200).json({
        status: "OK",
        message: "Asesor registrado correctamente"
    });
}