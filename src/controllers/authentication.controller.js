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

    const valUser = users.find((user) => user.email === email);

    if (!valUser) {
        return res.status(400).json({
            status: "Error",
            errors: [{ param: "email", msg: "Usuario no encontrado" }],
        });
    }

    const isPasswordValid = await bcryptjs.compare(password, valUser.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            status: "Error",
            errors: [{ param: "password", msg: "Contraseña incorrecta" }],
        });
    }

    const token = JsonWebToken.sign(
        { email: valUser.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    const cookieOptions = {
        expiresIn: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
        ),
        path: "/",
    };

    res.cookie("jwt", token, cookieOptions);

    return res.status(200).json({
        status: "OK",
        message: "Login exitoso",
        redirect: "/",
    });
}

async function register(req, res) {
    try {
        const { name, lastName, email, password, confirmPassword } = req.body;

        // Validaciones de express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "Error",
                errors: errors.array()
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                status: "Error",
                errors: [
                    { param: "confirmPassword", msg: "Las contraseñas no coinciden" }
                ]
            });
        }

        // Leer json de usuarios
        let users = [];
        try {
            users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
        } catch (e) {
            users = [];
        }

        const valUserExis = users.find((user) => user.email === email);

        if (valUserExis) {
            return res.status(400).json({
                status: "Error",
                errors: [{ param: "email", msg: "Este usuario ya existe" }],
            });
        }

        const salt = await bcryptjs.genSalt(5);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = {
            id: uuidv4(),
            name,
            lastName,
            email,
            password: hashPassword,
        };

        users.push(newUser);
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");

        return res.status(200).json({
            status: "OK",
            message: "Usuario registrado correctamente",
            redirect: "/login"
        });

    } catch (e) {
        console.error("Error al registrar el usuario:", e);
        return res.status(500).json({
            status: "Error",
            message: "Error interno del servidor"
        });
    }
}

export const methods = { login, register };