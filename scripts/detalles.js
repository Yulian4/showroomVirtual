let vehiculo;

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carroId = urlParams.get('id');

    if (!carroId) {
        mostrarError('No se encontró información del vehículo');
        return;
    }

    fetch("/src/models/dbAutos.json")
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar datos');
            return response.json();
        })
        .then(data => {
            vehiculo = encontrarVehiculo(data, carroId);
            if (vehiculo) {
                mostrarDetalles(vehiculo);
                configurarObservadorKilometraje();
            } else {
                mostrarError('Vehículo no encontrado');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarError('Error al cargar los datos del vehículo');
        });
});

function encontrarVehiculo(data, id) {
    for (const categoria of data) {
        const modelos = categoria.modelos || categoria.modelos;
        const encontrado = modelos.find(m => m.id == id);
        if (encontrado) {
            encontrado.categoria = categoria.tipo;
            return encontrado;
        }
    }
    return null;
}

function mostrarDetalles(vehiculo) {
    document.getElementById('modelo-nombre').textContent = vehiculo.name;
    document.getElementById('imagen-principal').src = `/public/img/carros/${vehiculo.img_url}`;
    document.getElementById('imagen-principal').alt = vehiculo.name;
    document.getElementById('imagen-secundaria').src = `/public/img/carros/${vehiculo.img_url}`;
    document.getElementById('imagen-tres').src = `/public/img/carros/${vehiculo.img_url}`;
    document.getElementById('imagen-cuatro').src = `/public/img/carros/${vehiculo.img_url}`;

    document.getElementById('especificaciones').innerHTML = `
        <div class="categoria"><img src="/public/img/assets/velo.png" alt=""><p id="categoria"> ${vehiculo.categoria}</p></div>
        <p><strong></strong> ${vehiculo.descripcion}</p>
    `;

    document.getElementById('caracteristicas').innerHTML = `
    <div class="caracteristicas">
     <ul>
            <li>Motor avanzado</li>
            <li>Sistema de seguridad</li>
            <li>Tecnología de conectividad</li>
        </ul>
    </div>
       
    `;
}

function configurarObservadorKilometraje() {
    const seccionKilometraje = document.getElementById('section2');
    if (!seccionKilometraje) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarKilometraje(vehiculo.kilometraje);
                observer.unobserve(seccionKilometraje);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(seccionKilometraje);
}

function animarKilometraje(kilometrajeFinal) {
    const elementoNumero = document.getElementById('kilometraje');
    if (!elementoNumero) return;

    const duracion = 2000;
    const fps = 60;
    const totalFrames = Math.floor(duracion / (1000 / fps));
    const incremento = kilometrajeFinal / totalFrames;

    let cantidad = 0, frame = 0;

    function animar() {
        if (frame < totalFrames) {
            cantidad += incremento;
            elementoNumero.textContent = Math.round(cantidad).toLocaleString('es-ES');
            frame++;
            requestAnimationFrame(animar);
        } else {
            elementoNumero.textContent = kilometrajeFinal.toLocaleString('es-ES');
        }
    }

    elementoNumero.textContent = ' 0';
    requestAnimationFrame(animar);
}

function mostrarError(mensaje) {
    document.getElementById('modelo-nombre').textContent = 'Error';
    document.getElementById('especificaciones').innerHTML = `<p class="error">${mensaje}</p>`;
}