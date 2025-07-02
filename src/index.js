import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Router from './routers/router.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app)
const io = new Server(server);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configura el puerto usando process.env.PORT (Render) o 3000 como fallback local
const port = process.env.PORT || 3000;

app.use(cookieParser());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar el router principal
app.use("/", Router);

const clientes = new Set();
const asesores = new Set();

io.on('connection', socket => {
    console.log('Nuevo cliente conectado:', socket.id);

    socket.on('registrar', tipo => {
        console.log(`Socket ${socket.id} registrado como: ${tipo}`);
        if (tipo === 'cliente') {
            clientes.add(socket);
        } else if (tipo === 'asesor') {
            asesores.add(socket);
        }
    });

    socket.on('mensajeCliente', msg => {
        console.log('Cliente dice:', msg);
        asesores.forEach(s => s.emit('mensajeCliente', msg));
    });

    socket.on('mensajeAsesor', msg => {
        console.log('Asesor dice:', msg);
        clientes.forEach(s => s.emit('mensajeAsesor', msg));
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
        clientes.delete(socket);
        asesores.delete(socket);
    });
});

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
