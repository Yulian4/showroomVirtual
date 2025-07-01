import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

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

server.listen(3000, () => console.log('Servidor en http://localhost:3000'));
