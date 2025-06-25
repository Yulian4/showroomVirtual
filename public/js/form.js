document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // previene la accion por defecto del formulario

    // Acceso correcto a los valores de los campos
  const name = e.target.elements.name.value.trim();
  const lastName = e.target.elements.lastName.value.trim();
  const email = e.target.elements.email.value.trim();
  const password = e.target.elements.password.value;
  const confirmPassword = e.target.elements.confirmPassword.value;

  console.log(name);

  if (password !== confirmPassword){
    alert("La contrasea no coicide");
    return;
  }

  const res = await fetch("http://localhost:4000/api/register", {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      lastName,
      email,
      password,
      confirmPassword
    })
  });
  if(!res.ok)return menssageE.classList.toggle(escondis)

})