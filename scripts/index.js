 const btn = document.getElementById("btnMenu");
    const sideMenu = document.getElementById("sideMenu");

    btn.addEventListener("click", () => {
      sideMenu.classList.toggle("open");
    });