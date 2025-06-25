const historial =[];

async function sendPrompt(){
    const promptUsuarioInput = document.getElementById("promptUsuario"); // Get the input element
    const prompt = promptUsuarioInput.value; // Get the value from the input
    const chatBox = document.getElementById("chatBox");

    // --- Validaciones de texto al inicio ---
    if(!prompt.trim()){
        const cargando = document.createElement("div");
        cargando.className="botRespuesta";
        cargando.textContent="Escribe algo para ayudarte";

        chatBox.appendChild(cargando);
        chatBox.scrollTop = chatBox.scrollHeight;
        promptUsuarioInput.value = ""; // Clear input even if empty
        return;
    }

    // --- Mostrar el prompt del usuario ---
    const promptDiv = document.createElement("div");
    promptDiv.className="promptDiv";
    promptDiv.textContent=prompt;
    chatBox.appendChild(promptDiv);

    // --- Mostrar "Escribiendo..." ---
    const cargando = document.createElement("div");
    cargando.className="botRespuesta";
    cargando.textContent ="Escribiendo..."; // Added ellipsis for better UX
    chatBox.appendChild(cargando);

    // --- Construir el prompt completo para la API ---
    const promptCompleto = `Eres un asistente de la marca de autos LUNE. Aquí tienes la informacion con la que debes responder:
    Modelos y precios:
    - LUNE vale: 80.800.000 COP
    - LUNE yuls: 90.870.000 COP
    - LUNE miguel: 79.400.000 COP
    Próximos lanzamientos:
    - LUNE sena: Noviembre 2025
    Quienes somos:
    LUNE es una marca colombiana de autos de alta gama; vehículos que combinan lujo, diseño sofisticado y comodidad.
    Contacto:
    - Dirigirse desde el menu al apartado de "Agenda tu asesoria"
    Ubicacion:
    - Nuestra sede principal es: Cl. 19 Nte. #18N- 45, Armenia, Quindío, Colombia.
    Responde de forma clara,amable y brevemente. Si preguntan algo fuera del catálogo, indicalo.
    Mensaje de usuario: ${prompt} `;

    const api_key = 'AIzaSyAuDYw5-MFuD64bMROjgVrBrlJIp9oKxoE';
    const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${api_key}`;

    // --- Construir el cuerpo de la solicitud para la API ---
    const requestBody ={
        contents:[
            // Mapear el historial existente para el formato de la API
            ...historial.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{text: m.text}]
            })),
            // Agregar el mensaje actual del usuario con el contexto completo
            {
                role: 'user',
                parts: [{text: promptCompleto}]
            }
        ]
    };

    let respuesta = "Lo siento, no pude obtener una respuesta en este momento."; // Default response

    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        // --- CORRECCIÓN CRÍTICA AQUÍ: response.json() ---
        const data = await response.json(); // Correct method to parse JSON

        console.log("API Response Data:", data); // For debugging

        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
            respuesta = data.candidates[0].content.parts[0].text;
        } else if (data.error) {
            // Handle API-specific errors if provided in the response
            respuesta = `Error de la API: ${data.error.message || 'Error desconocido'}`;
            console.error("Error de la API:", data.error);
        } else {
            // Fallback if no candidates and no specific error object
            console.warn("Unexpected API response structure:", data);
            respuesta = "No se pudo interpretar la respuesta de la IA.";
        }

    } catch (error) {
        console.error("Hubo un error al contactar a la IA o al procesar la respuesta:", error);
        respuesta = "Hubo un error al contactar la IA.";
    }

    // --- Actualizar el mensaje "Escribiendo..." con la respuesta final ---
    cargando.textContent = respuesta;

    // --- Actualizar el historial local (con el prompt original y la respuesta del bot) ---
    historial.push ({role: 'user', text: prompt}); // Save the original user input
    historial.push ({role: 'bot', text: respuesta}); // Save the bot's response

    // --- Limpiar el input y hacer scroll ---
    promptUsuarioInput.value = ""; // Clear the input field correctly
    chatBox.scrollTop = chatBox.scrollHeight;
}