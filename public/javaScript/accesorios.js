const accesorio = document.querySelectorAll(".accesorio")
let cambio = 0
setInterval(() => {
    accesorio[cambio].classList.remove("active")
    cambio = (cambio + 1)% accesorio.length
    accesorio[cambio].classList.add("active")
}, 2000);
