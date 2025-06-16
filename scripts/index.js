document.addEventListener("DOMContentLoaded", () => {
    
})
//visibilidad del boton al hacer click
 const btn = document.getElementById("btnMenu");
    const sideMenu = document.getElementById("sideMenu");

    btn.addEventListener("click", () => {
      sideMenu.classList.toggle("open");
    });

//quitar el menu al hacer scroll
    window.addEventListener("scroll", function(){
      if(window.scrollY > 0) {
        sideMenu.classList.remove("open");
      }
    });