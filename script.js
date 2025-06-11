const btn = document.getElementById("btnMenu");
const sideMenu = document.getElementById("sideMenu");

btn.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
});
let cantidad = 150;
const numero = document.getElementById("numero");
const duracion = 2000;
const incrementoTotal = 200;
const incrementoPorFrame = (incrementoTotal / duracion) * 16; 

function animar() {
    cantidad = Math.min(cantidad + incrementoPorFrame, incrementoTotal);
    numero.textContent = Math.round(cantidad);
    
    if (cantidad < incrementoTotal) {
        requestAnimationFrame(animar);
    }
}

requestAnimationFrame(animar);



