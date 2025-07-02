const socket = io();
socket.emit('registrar', 'asesor');

socket.on('mensajeCliente', msg => {
  console.log('Recibido del cliente:', msg);  // <-- clave
  const mensajes = document.getElementById('mensajes');
  const div = document.createElement('div');
  div.classList.add('mensaje-asesor');
  div.textContent = 'Cliente: ' + msg;
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
  socket.emit('mensajeAsesor', mensaje);
  input.value = '';
}
