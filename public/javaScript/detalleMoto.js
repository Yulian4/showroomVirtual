let vehiculo;

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = window.location.toString().split('/');
    console.log(urlParams[urlParams.length-1]);
    const carroId = urlParams[urlParams.length-1];
    console.log(carroId);

    if (!carroId) {
        mostrarError('No se encontró información del vehículo');
        return;
    }
    fetch("/data/motorbike.json")
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
        const modelos = categoria.modelos || [];
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
    document.getElementById('imagen-principal').src = `/assets/images/vehicles/motorbikes/${vehiculo.img_urls[0]}`;
    document.getElementById('imagen-principal').alt = vehiculo.name;
    document.getElementById('imagen-secundaria').src = `/assets/images/vehicles/motorbikes/${vehiculo.img_urls[0]}`;
    document.getElementById('imagen-tres').src = `/assets/images/vehicles/motorbikes/${vehiculo.img_urls[0]}`;
    document.getElementById('imagen-cuatro').src = `/assets/images/vehicles/motorbikes/${vehiculo.img_urls[0]}`;

    document.getElementById('especificaciones').innerHTML = `
        <div class="categoria">
            <img src="/assets/images/icons/velocimetro.png">
            <p id="categoria">${vehiculo.categoria}</p>
        </div>
        <p>${vehiculo.descripcion}</p>
    `;

    const caracteristicasContenedor = document.getElementById('caracteristicas');
    caracteristicasContenedor.innerHTML = '';

    if (vehiculo.caracteristicas && Array.isArray(vehiculo.caracteristicas)) {
        vehiculo.caracteristicas.slice(0, 3).forEach(caract => {
            const item = document.createElement('div');
            item.className = 'caracteristica-item';

            const icono = document.createElement('i');
            icono.className = caract.icono || 'fi fi-rr-check';

            const texto = document.createElement('span');
            texto.textContent = caract.texto;

            item.appendChild(icono);
            item.appendChild(texto);
            caracteristicasContenedor.appendChild(item);
        });
    } else {
        caracteristicasContenedor.innerHTML = '<p>No hay características disponibles.</p>';
    }

    const puntos = document.querySelectorAll('#section5 .point');
    puntos.forEach(punto => {
        punto.addEventListener('click', () => {
            document.querySelectorAll('.point circle').forEach(c => c.setAttribute('fill', 'grey'));
            const textoElem = punto.querySelector('text');
            if (!textoElem) return;

            const titulo = textoElem.textContent.trim().toUpperCase();

            const caracteristica = vehiculo.caracteristicas.find(caract =>
                caract.titulo && caract.titulo.toUpperCase() === titulo
            );

            if (caracteristica) {
                document.getElementById('detalle-titulo').textContent = caracteristica.titulo;
                document.getElementById('detalle-texto').textContent = caracteristica.texto;
                punto.querySelector('circle').setAttribute('fill', 'white');
            } else {
                document.getElementById('detalle-titulo').textContent = titulo;
                document.getElementById('detalle-texto').textContent = 'No hay descripción disponible.';
            }
        });
    });
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

    elementoNumero.textContent = '0';
    requestAnimationFrame(animar);
}

function mostrarError(mensaje) {
    document.getElementById('modelo-nombre').textContent = 'Error';
    document.getElementById('especificaciones').innerHTML = `<p class="error">${mensaje}</p>`;
}
