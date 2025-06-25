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

//mostrar el chatbot

function mostrarChat(){
  const seccion = document.getElementById('sectionIA')
  seccion.classList.remove('oculto')
  seccion.classList.add('visible')
}

// cerrar el chat bot
function cerrarChat() {
  const seccion = document.getElementById('sectionIA');
  seccion.classList.remove('visible');
  seccion.classList.add('oculto'); 
}
document.getElementById('cerrarIA').addEventListener('click', cerrarChat);
