// fecha: 27 julio 2025

const fecha = new Date(2025,6,27);


setInterval(() => {
    console.log("contador activo")
    const fechaHoy = new Date().getTime();
    const tiempoRestante = fecha-fechaHoy
    
    const segundo = 1000
    const minuto = segundo * 60
    const hora = minuto * 60
    const dia = hora * 24

    const diaCompleto = Math.floor(tiempoRestante/dia)
    const restoHoras = tiempoRestante % dia
    const horaCompleta = Math.floor(restoHoras/hora)
    const restoMin = restoHoras % hora
    const minCompleto = Math.floor(restoMin/minuto)
    const restoSeg = restoMin % minuto
    const segCompleto = Math.floor(restoSeg/segundo)
    
    const dias = document.getElementById('dias');
    const horas = document.getElementById('horas');
    const minutos = document.getElementById('minutos');
    const segundos = document.getElementById('segundos');
    
    dias.textContent = diaCompleto
    horas.textContent = horaCompleta
    minutos.textContent = minCompleto
    segundos.textContent = segCompleto
  
}, 1000);

const contenedores = document.querySelectorAll(".contenedor")
let index = 0
setInterval(() => {
    contenedores[index].classList.remove("activo")
    index = (index + 1)% contenedores.length
    contenedores[index].classList.add("activo")
}, 15000);