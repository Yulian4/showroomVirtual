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


//slider - section carrusel
const slides = document.getElementById("contentsCarrusel");
  const totalSlides = slides.children.length;
  const slideWidth = slides.children[0].offsetWidth;

  let currentIndex = 0;

  function slideTo(index, smooth = true) {
    slides.style.transition = smooth ? "transform 0.5s ease-in-out" : "none";
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function siguienteSlide() {
    currentIndex++;
    slideTo(currentIndex);

    // volver sin animacion 
    if (currentIndex === totalSlides - 1) {
      setTimeout(() => {
        currentIndex = 0;
        slideTo(currentIndex, false); // sin animación
      }, 500); // espera a que termine la transición
    }
  }

  // Moverse automáticamente cada 4 segundos
  setInterval(siguienteSlide, 4000);



