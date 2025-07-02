document.getElementById("formAsesor").addEventListener("submit", async function(e) {
            e.preventDefault();
            const form = e.target;
            const res = await fetch("/register-asesor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.value,
                    email: form.email.value,
                    password: form.password.value
                })
            });
            const data = await res.json();
            document.getElementById("msg").textContent = data.message || (data.errors && data.errors[0].msg) || "Error";
            if (res.ok) form.reset();
        });