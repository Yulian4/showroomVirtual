function showFieldError(field, message) {
    const errorDiv = document.getElementById(`error${field.charAt(0).toUpperCase() + field.slice(1)}`);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = "block";
    }
}

function clearFieldError(field) {
    const errorDiv = document.getElementById(`error${field.charAt(0).toUpperCase() + field.slice(1)}`);
    if (errorDiv) {
        errorDiv.textContent = "";
        errorDiv.style.display = "none";
    }
}

function clearAllErrors() {
    ["Name", "LastName", "Email", "Password", "ConfirmPassword"].forEach(field => clearFieldError(field));
}

document
    .getElementById("registerForm")
    .addEventListener("submit", async function (e) {
        e.preventDefault();
        clearAllErrors();

        const name = e.target.elements.name.value.trim();
        const lastName = e.target.elements.lastName.value.trim();
        const email = e.target.elements.email.value.trim();
        const password = e.target.elements.password.value;
        const confirmPassword = e.target.elements.confirmPassword.value;

        let hasError = false;

        if (!name) {
            showFieldError("Name", "El nombre es obligatorio");
            hasError = true;
        }
        if (!lastName) {
            showFieldError("LastName", "El apellido es obligatorio");
            hasError = true;
        }
        if (!email) {
            showFieldError("Email", "El email es obligatorio");
            hasError = true;
        }
        if (!password) {
            showFieldError("Password", "La contraseña es obligatoria");
            hasError = true;
        }
        if (!confirmPassword) {
            showFieldError("ConfirmPassword", "Debes confirmar la contraseña");
            hasError = true;
        }
        if (password && confirmPassword && password !== confirmPassword) {
            showFieldError("ConfirmPassword", "Las contraseñas no coinciden");
            hasError = true;
        }
        if (hasError) return;

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                lastName,
                email,
                password,
                confirmPassword,
            }),
        });

        const resjson = await res.json();
        if (!res.ok) {
            // Si el backend devuelve errores por campo
            if (resjson.errors) {
                resjson.errors.forEach(err => {
                    showFieldError(err.param, err.msg);
                });
            } else {
                // Error general
                showFieldError("Name", resjson.message || "Error al registrar");
            }
            return;
        }
        if (resjson.redirect) {
            window.location.href = resjson.redirect;
        }
    });

// Outline dinámico para password
const passwordInput = document.getElementById("password");
if (passwordInput) {
    passwordInput.addEventListener("input", function () {
        if (passwordInput.value.length < 8) {
            passwordInput.style.outline = "2px solid #d32f2f"; // rojo
        } else if (passwordInput.value.length < 12) {
            passwordInput.style.outline = "2px solid orange";
        } else {
            passwordInput.style.outline = "2px solid #2A7B9B"; // azulito
        }
    });
    passwordInput.addEventListener("blur", function () {
        passwordInput.style.outline = "";
    });
}