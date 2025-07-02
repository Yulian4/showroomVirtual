import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersPath = path.join(__dirname, "../data/users.json");

/**
 * Controlador para login de admin y asesores.
 * Solo permite login si el usuario es admin o asesor.
 */
async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "Error",
            errors: errors.array(),
        });
    }

    const { email, password } = req.body;

    // Leer usuarios
    let users = [];
    try {
        users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    } catch (e) {
        users = [];
    }

    // Buscar usuario por email
    const user = users.find((u) => u.email === email);

    if (!user) {
        return res.status(400).json({
            status: "Error",
            errors: [{ param: "email", msg: "Usuario no encontrado" }],
        });
    }

    // Validar contraseña
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            status: "Error",
            errors: [{ param: "password", msg: "Contraseña incorrecta" }],
        });
    }

    // Solo permite login a admin o asesor
    if (user.role !== "admin" && user.role !== "asesor") {
        return res.status(403).json({
            status: "Error",
            errors: [{ param: "email", msg: "No tienes permisos para acceder" }],
        });
    }

    // Generar token JWT
    const token = JsonWebToken.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    // Opciones de cookie
    const cookieOptions = {
        expiresIn: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
        ),
        path: "/",
    };

    res.cookie("jwt", token, cookieOptions);

    // Redirige según el rol
   return res.redirect(user.role === "admin" ? "/admin" : "/asesor");
}

async function renderRegister(req, res) {
    res.sendFile(path.join(__dirname, "../views/register-asesor.html"));
}

export const methods = { login };
