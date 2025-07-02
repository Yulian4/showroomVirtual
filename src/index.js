import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
<<<<<<< HEAD
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();
import router from './routers/router.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("port",process.env.PORT || 4000);

// Middlewares para servir archivos estáticos y parsear cookies
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Usar el router principal
app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
    console.log(`http://localhost:${app.get("port")}`);
});
=======
import Router from './routers/router.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
const app = express();
const server = createServer(app)
const io = new Server(server);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("port", 4000);

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
// app.listen(app.get("port"), () => {
//     console.log(`Server is running on port ${app.get("port")}`);
//     console.log(`http://localhost:${app.get("port")}`);

// });
server.listen(3000,()=>
console.log("servidor en http://localhost:3000"))
>>>>>>> cd9c083255aec686cf1edf99b38e8f2387aaccdc
