const numWords = {
    "cero": 0, "uno": 1, "una": 1, "dos": 2, "tres": 3, "cuatro": 4, "cinco": 5, "seis": 6, "siete": 7, "ocho": 8,
    "nueve": 9, "diez": 10, "once": 11, "doce": 12, "trece": 13, "catorce": 14, "quince": 15, "dieciséis": 16,
    "diecisiete": 17, "dieciocho": 18, "diecinueve": 19, "veinte": 20, "treinta": 30, "cuarenta": 40, "cincuenta": 50,
    "sesenta": 60, "setenta": 70, "ochenta": 80, "noventa": 90, "cien": 100, "ciento": 100, "doscientos": 200,
    "trescientos": 300, "cuatrocientos": 400, "quinientos": 500, "seiscientos": 600, "setecientos": 700,
    "ochocientos": 800, "novecientos": 900, "mil": 1000, "millón": 1000000, "millones": 1000000
};

function palabrasANumero(palabras) {
    const palabrasList = palabras.split(" ");
    let numero = 0;
    for (const palabra of palabrasList) {
        if (numWords[palabra] !== undefined) {
            numero = numero * 10 + numWords[palabra];
        } else {
            throw new Error(`Palabra no reconocida: ${palabra}`);
        }
    }
    return numero;
}

function convertirPalabrasANumero(palabras) {
    palabras = palabras.replace(" euros", "").replace(" centimos", "").trim().toLowerCase();

    let partes;
    if (palabras.includes(" con ")) {
        partes = palabras.split(" con ");
    } else if (palabras.includes(" y ")) {
        partes = palabras.split(" y ");
    } else {
        partes = [palabras];
    }

    const enteroStr = String(palabrasANumero(partes[0]));
    const decimalStr = partes.length > 1 ? String(palabrasANumero(partes[1])).padStart(2, "0") : "00";

    return parseFloat(`${enteroStr}.${decimalStr}`);
}

// Configuración del reconocimiento de voz
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "es-ES";
recognition.interimResults = false;

document.getElementById("startVoice").addEventListener("click", () => {
    recognition.start();
});

recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("inputTexto").value = transcript;
});

recognition.addEventListener("error", (event) => {
    alert("Error en el reconocimiento de voz: " + event.error);
});

document.getElementById("conversionForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const inputTexto = document.getElementById("inputTexto").value;
    const resultado = document.getElementById("resultado");

    try {
        const numero = convertirPalabrasANumero(inputTexto);
        resultado.textContent = `El número es: ${numero}`;
    } catch (error) {
        resultado.textContent = error.message;
    }
});