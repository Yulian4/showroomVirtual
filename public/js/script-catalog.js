let modelosData = [];

// Cargar el JSON de modelos
fetch("../../src/models/dbAutos.json")
    .then((response) => response.json())
    .then((data) => {
        modelosData = data;
        setupListeners();
    })
    .catch((error) => console.error("Error al cargar el JSON:", error));

function setupListeners() {
    const tipoLis = document.querySelectorAll(".aside-vehiculo .li--hover");
    const asideModelos = document.getElementById("aside-modelos");
    const imgVistaPreviaSection = document.getElementById("img-vista-previa");
    const imgDefault = "/public/img/assets/logoLUNE.png";

    // Función para mostrar los modelos de un tipo y seleccionar el primero si se indica
    function mostrarModelosYSeleccionar(tipoObj, selectFirst = false) {
        // Renderiza la lista de modelos
        asideModelos.innerHTML = `<ul> 
            <h3 class="h3 h3-sub_titulo_aside">MODELOS</h3>

            ${
                tipoObj.modelos.map((modelo) => {
                    let nombre = modelo.name || modelo;
                    let img = modelo.img_url || "";
                    return `<li class="modelo-li" data-img="${img}">${nombre}</li>`;
                }).join("")
            }
        </ul>`;

        const modeloLis = asideModelos.querySelectorAll(".modelo-li");

        // Listener para cada modelo: activa el modelo y muestra la vista previa
        modeloLis.forEach((modeloLi) => {
            modeloLi.addEventListener("mouseenter", () => {
                modeloLis.forEach((m) => m.classList.remove("activo"));
                modeloLi.classList.add("activo");
                let img = modeloLi.getAttribute("data-img");
                let nombre = modeloLi.textContent;

                // Busca el modelo para obtener el id
                let modelo = tipoObj.modelos.find((m) => (m.name || m) === nombre);
                let id = modelo && modelo.id ? modelo.id : "";
                let imgSrc = !img || !img.includes(".")
                    ? imgDefault
                    : `/public/img/carros/${img}`;

                // Muestra la vista previa con título, imagen y botón
                imgVistaPreviaSection.innerHTML = `
                    <h2 style="margin-bottom:10px;">${nombre}</h2>
                    <img src="${imgSrc}" alt="${nombre}" style="max-width:100%;max-height:300px;display:block;margin-bottom:10px;">
                    <a href="detalle.html?id=${id}" class="btn-ver-mas">Ver más información</a>
                `;
            });
        });

        // Si se solicita, selecciona automáticamente el primer modelo
        if (selectFirst && modeloLis.length > 0) {
            modeloLis[0].classList.add("activo");
            modeloLis[0].dispatchEvent(new Event("mouseenter"));
        }
    }

    // Listener para cada tipo de carro: activa el tipo y muestra sus modelos
    tipoLis.forEach((li) => {
        li.addEventListener("mouseenter", () => {
            tipoLis.forEach((l) => l.classList.remove("activo"));
            li.classList.add("activo");
            const tipo = li.getAttribute("data-tipo");
            const tipoObj = modelosData.find((t) => t.tipo === tipo);
            if (!tipoObj) return;
            mostrarModelosYSeleccionar(tipoObj, true);
        });
    });

    // Al cargar la vista, selecciona el primer tipo y su primer modelo automáticamente
    if (tipoLis.length > 0) {
        tipoLis[0].classList.add("activo");
        const primerTipo = tipoLis[0].getAttribute("data-tipo");
        const tipoObj = modelosData.find((t) => t.tipo === primerTipo);
        if (tipoObj) {
            mostrarModelosYSeleccionar(tipoObj, true);
        }
    }
}