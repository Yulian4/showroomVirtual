import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', socket => {
    console.log('Nuevo cliente conectado:', socket.id);
setTimeout(() => {
    console.log("Enviando mensaje de prueba");
    socket.emit('mensajeAsesor', 'Mensaje de prueba desde el servidor');
}, 3000);
    socket.on('mensajeCliente', msg => {
        console.log('Cliente dice:', msg);
        socket.broadcast.emit('mensajeAsesor', msg);
    });

    socket.on('mensajeAsesor', msg => {
        console.log('Asesor dice:', msg);
        socket.broadcast.emit('mensajeCliente', msg); 
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

server.listen(3000, () => console.log('Servidor en http://localhost:3000'));
