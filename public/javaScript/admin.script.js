// Script para mostrar la lista de asesores en la vista de admin

document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/asesores")
        .then(res => res.json())
        .then(asesores => {
            const ul = document.getElementById("lista-asesores");
            ul.innerHTML = "";
            asesores.forEach(asesor => {
                const li = document.createElement("li");
                li.textContent = `${asesor.name} (${asesor.email})`;
                ul.appendChild(li);
            });
        });
});