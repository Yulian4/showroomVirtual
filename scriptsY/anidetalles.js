document.addEventListener('DOMContentLoaded', function () {
    let seccionActual = 0;
    let animacion = false;

    const secciones = document.querySelectorAll('.vistas, .vistasc');
    const puntos = document.querySelectorAll('.punto');
    const detalles = document.querySelector('.detalles');

    puntos[0].classList.add('active');

    puntos.forEach((punto, index) => {
        punto.addEventListener('click', (e) => {
            e.preventDefault();
            if (!animacion && index !== seccionActual) {
                navigateToSection(index);
            }
        });
    });

    detalles.addEventListener('wheel', (e) => {
        if (animacion) {
            e.preventDefault();
            return;
        }

        if (e.deltaY > 0 && seccionActual < secciones.length - 1) {
            navigateToSection(seccionActual + 1);
            e.preventDefault();
        } else if (e.deltaY < 0 && seccionActual > 0) {
            navigateToSection(seccionActual - 1);
            e.preventDefault();
        }
    });

    let touchStartY = 0;
    detalles.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    detalles.addEventListener('touchmove', (e) => {
        if (animacion) {
            e.preventDefault();
            return;
        }

        const touchY = e.touches[0].clientY;
        const diff = touchStartY - touchY;

        if (diff > 50 && seccionActual < secciones.length - 1) {
            navigateToSection(seccionActual + 1);
            e.preventDefault();
        } else if (diff < -50 && seccionActual > 0) {
            navigateToSection(seccionActual - 1);
            e.preventDefault();
        }
    }, { passive: false });

    function navigateToSection(newIndex) {
        if (animacion || newIndex === seccionActual) return;

        animacion = true;

        puntos.forEach(p => p.classList.remove('active'));
        puntos[newIndex].classList.add('active');

        secciones[newIndex].scrollIntoView({ behavior: 'smooth' });
        seccionActual = newIndex;

        setTimeout(() => {
            animacion = false;
        }, 1000);
    }
});
