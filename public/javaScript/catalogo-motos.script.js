// Variable para almacenar los datos de motos
let motorbikes = [];

// Cargar el JSON de modelos de motos
fetch("/data/motorbike.json")
    .then((response) => response.json())
    .then((data) => {
        motorbikes = data;
        setupListeners(); // Inicializa los listeners cuando los datos están listos
    })
    .catch((error) => {
        // Si falla la carga, muestra un mensaje en la UI
        const asideModelos = document.getElementById("aside-modelos");
        if (asideModelos) {
            asideModelos.innerHTML = "<p style='color:red;'>No se pudo cargar el catálogo de motos.</p>";
        }
        const vistaPrevia = document.getElementById("vista-previa");
        if (vistaPrevia) {
            vistaPrevia.innerHTML = "";
        }
        console.error("Error al cargar motorbike.json:", error);
    });

// Función principal para inicializar los listeners y renderizar la UI
function setupListeners() {
    // Selecciona los elementos del DOM
    const tipoLis = document.querySelectorAll(".aside-vehiculo .li--hover");
    const asideModelos = document.getElementById("aside-modelos");
    const imgVistaPreviaSection = document.getElementById("vista-previa");
    const imgDefault = "/assets/images/logoLUNE.png";

    // Renderiza los modelos de un tipo de moto y permite seleccionar uno
    function mostrarModelosYSeleccionar(tipoObj, selectFirst = false) {
        // Renderiza la lista de modelos
        asideModelos.innerHTML = `<ul> 
            <h3 class="h3 h3-sub_titulo_aside">MODELOS</h3>
            ${
                tipoObj.modelos.map((modelo) => {
                    let nombre = modelo.name || modelo;
                    let img = modelo.img_urls && modelo.img_urls.length > 0 ? modelo.img_urls[0] : "";
                    return `<li class="modelo-li" data-img="${img}">${nombre}</li>`;
                }).join("")
            }
        </ul>`;

        // Selecciona todos los modelos renderizados
        const modeloLis = asideModelos.querySelectorAll(".modelo-li");

        // Listener para mostrar la vista previa al pasar el mouse sobre un modelo
        modeloLis.forEach((modeloLi) => {
            modeloLi.addEventListener("mouseenter", () => {
                modeloLis.forEach((m) => m.classList.remove("activo"));
                modeloLi.classList.add("activo");
                let img = modeloLi.getAttribute("data-img");
                let nombre = modeloLi.textContent;
                let modelo = tipoObj.modelos.find((m) => (m.name || m) === nombre);
                let id = modelo && modelo.id ? modelo.id : "";
                let imgSrc = !img || !img.includes(".")
                    ? imgDefault
                    : `/assets/images/vehicles/motorbikes/${img}`;

                imgVistaPreviaSection.innerHTML = `
                    <h2 style="margin-bottom:10px;">${nombre}</h2>
                    <div class="img-vista-previa-contenedor">
                        <img src="${imgSrc}" alt="${nombre}" class="img-vista-previa">
                    </div>
                    <a href="detalleMoto/${id}" class="btn-ver-mas button">Ver más información</a>
                `;
            });
        });

        // Selecciona el primer modelo por defecto si se indica
        if (selectFirst && modeloLis.length > 0) {
            modeloLis[0].classList.add("activo");
            modeloLis[0].dispatchEvent(new Event("mouseenter"));
        }
    }

    // Listener para cada tipo de moto
    tipoLis.forEach((li) => {
        li.addEventListener("mouseenter", () => {
            tipoLis.forEach((l) => l.classList.remove("activo"));
            li.classList.add("activo");
            const tipo = li.getAttribute("data-tipo");
            let tipoObj = motorbikes.find((t) => t.tipo === tipo);
            if (!tipoObj) return;
            mostrarModelosYSeleccionar(tipoObj, true);
        });
    });

    // Selecciona el primer tipo de moto por defecto al cargar la página
    if (tipoLis.length > 0) {
        tipoLis[0].classList.add("activo");
        const primerTipo = tipoLis[0].getAttribute("data-tipo");
        let tipoObj = motorbikes.find((t) => t.tipo === primerTipo);
        if (tipoObj) {
            mostrarModelosYSeleccionar(tipoObj, true);
        }
    }
}