import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * Middleware para verificar si el usuario está autenticado.
 */
export function isAuthenticated(req, res, next) {
    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No autenticado" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Token inválido" });
    }
}

/**
 * Middleware para verificar si el usuario es admin.
 */
export function isAdmin(req, res, next) {
    if (req.user?.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "No autorizado" });
    }
}

/**
 * Middleware para verificar si el usuario es asesor.
 */
export function isAsesor(req, res, next) {
    if (req.user?.role === "asesor") {
        next();
    } else {
        return res.status(403).json({ message: "No autorizado" });
    }
}