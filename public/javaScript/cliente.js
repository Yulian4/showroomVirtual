const socket = io();
socket.emit('registrar', 'cliente');

socket.on('mensajeAsesor', msg => {
    console.log('Recibido del asesor:', msg);
  const mensajes = document.getElementById('mensajes');
  const div = document.createElement('div');
  div.classList.add('mensaje-asesor');
  div.textContent = 'Asesor: ' + msg;
  mensajes.appendChild(div);
});

function enviarMensaje() {
  const input = document.getElementById('mensaje');
  const mensaje = input.value;
  if (!mensaje.trim()) return;
  const mensajes = document.getElementById('mensajes');
  const div = document.createElement('div');
  div.classList.add('mensaje-mio');
  div.textContent = 'Tú: ' + mensaje;
  mensajes.appendChild(div);
  socket.emit('mensajeCliente', mensaje);
  input.value = '';
}
