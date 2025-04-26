// Crear un array de 100 mensajes positivos
const mensajesPositivos = [
    "¡Eres increíble y capaz de lograr grandes cosas!",
    "¡Hoy es un gran día para sonreír!",
    "¡Tu esfuerzo siempre vale la pena!",
    "¡Eres una persona única y especial!",
    "¡Confía en ti mismo, puedes hacerlo!",
    "¡Cada día es una nueva oportunidad para brillar!",
    "¡Tu amabilidad ilumina el mundo!",
    "¡Eres más fuerte de lo que crees!",
    "¡Nunca dejes de soñar en grande!",
    "¡Tu energía positiva es contagiosa!",
    // Agrega más mensajes hasta llegar a 100
    "¡Eres una fuente de inspiración para los demás!",
    "¡Tu creatividad no tiene límites!",
    "¡Siempre hay algo bueno esperando por ti!",
    "¡Eres digno de todo lo bueno que te sucede!",
    "¡Tu sonrisa puede cambiar el día de alguien!",
    "¡Eres valiente y resiliente!",
    "¡El mundo es mejor porque tú estás en él!",
    "¡Tu potencial es ilimitado!",
    "¡Eres un ejemplo de perseverancia!",
    "¡Cada paso que das te acerca a tus metas!",
    "¡Tu bondad hace del mundo un lugar mejor!",
    "¡Eres capaz de superar cualquier desafío!",
    "¡Tu actitud positiva es admirable!",
    "¡Eres una persona maravillosa!",
    "¡Siempre hay algo por lo que estar agradecido!",
    "¡Eres un imán para las cosas buenas!",
    "¡Tu entusiasmo es inspirador!",
    "¡Eres un solucionador de problemas nato!",
    "¡Tu pasión por la vida es contagiosa!",
    "¡Eres un faro de luz para los demás!",
    "¡Tu determinación es impresionante!",
    "¡Eres una persona llena de posibilidades!",
    "¡Tu felicidad es importante!",
    "¡Eres un ejemplo de generosidad!",
    "¡Tu corazón está lleno de amor!",
    "¡Eres una persona digna de admiración!",
    "¡Tu optimismo es una fuerza poderosa!",
    "¡Eres un constructor de sueños!",
    "¡Tu autenticidad es tu mayor fortaleza!",
    "¡Eres una persona llena de esperanza!",
    "¡Tu perseverancia te llevará lejos!",
    "¡Eres un creador de momentos felices!",
    "¡Tu espíritu es inquebrantable!",
    "¡Eres una persona llena de gratitud!",
    "¡Tu alegría es contagiosa!",
    "¡Eres un ejemplo de humildad!",
    "¡Tu confianza en ti mismo es inspiradora!",
    "¡Eres una persona llena de posibilidades infinitas!",
    "¡Tu amor por la vida es admirable!",
    "¡Eres un modelo a seguir para los demás!",
    "¡Tu energía positiva transforma el mundo!",
    "¡Eres una persona llena de sabiduría!",
    "¡Tu capacidad para aprender es asombrosa!",
    "¡Eres una persona llena de coraje!",
    "¡Tu bondad no tiene límites!",
    "¡Eres una persona llena de compasión!",
    "¡Tu entusiasmo por la vida es inspirador!",
    "¡Eres una persona llena de determinación!",
    "¡Tu creatividad es una fuente de alegría!",
    "¡Eres una persona llena de amor propio!",
    "¡Tu capacidad para superar obstáculos es admirable!",
    "¡Eres una persona llena de esperanza y fe!",
    "¡Tu dedicación es digna de elogio!",
    "¡Eres una persona llena de posibilidades emocionantes!",
    "¡Tu actitud positiva es un regalo para el mundo!",
    "¡Eres una persona llena de sueños por cumplir!",
    "¡Tu capacidad para inspirar a otros es asombrosa!",
    "¡Eres una persona llena de luz y amor!",
    "¡Tu resiliencia es una fuente de fortaleza!",
    "¡Eres una persona llena de alegría y felicidad!",
    "¡Tu capacidad para ver lo bueno en los demás es admirable!",
    "¡Eres una persona llena de gratitud y aprecio!",
    "¡Tu capacidad para hacer reír a los demás es un don!",
    "¡Eres una persona llena de energía positiva y entusiasmo!",
    "¡Tu capacidad para encontrar soluciones es impresionante!",
    "¡Eres una persona llena de pasión por la vida!",
    "¡Tu capacidad para amar y ser amado es infinita!",
    "¡Eres una persona llena de posibilidades y oportunidades!",
    "¡Tu capacidad para aprender y crecer es ilimitada!",
    "¡Eres una persona llena de bondad y generosidad!",
    "¡Tu capacidad para enfrentar desafíos es admirable!",
    "¡Eres una persona llena de esperanza y optimismo!",
    "¡Tu capacidad para hacer el bien es inspiradora!",
    "¡Eres una persona llena de amor y compasión!",
    "¡Tu capacidad para transformar el mundo es asombrosa!",
    "¡Eres una persona llena de luz y alegría!",
    "¡Tu capacidad para crear cosas maravillosas es impresionante!",
    "¡Eres una persona llena de sueños y aspiraciones!",
    "¡Tu capacidad para hacer una diferencia es inspiradora!",
    "¡Eres una persona llena de posibilidades infinitas!",
    "¡Tu capacidad para ser feliz es ilimitada!",
    "¡Eres una persona llena de amor y gratitud!",
    "¡Tu capacidad para inspirar a otros es admirable!"
];

// Crear un cuadro de diálogo personalizado
const modal = document.createElement('div');
modal.style.position = 'fixed';
modal.style.top = '50%';
modal.style.left = '50%';
modal.style.transform = 'translate(-50%, -50%)';
modal.style.backgroundColor = 'white';
modal.style.padding = '20px';
modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
modal.style.display = 'none';
modal.style.zIndex = '1000';
modal.style.borderRadius = '25px'; // Borde redondeado

// Título del cuadro de diálogo
const title = document.createElement('h2');
title.textContent = '¡Atención: Mensaje del día!';
title.style.textAlign = 'center';
modal.appendChild(title);

// Mensaje del cuadro de diálogo
const message = document.createElement('p');
message.style.textAlign = 'center';
modal.appendChild(message);

// Botón para cerrar el cuadro de diálogo
const closeButton = document.createElement('button');
closeButton.textContent = 'Cierra este hermoso mensaje :(';
closeButton.className = 'welcome-button';
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
modal.appendChild(closeButton);

// Agregar el cuadro de diálogo al documento
document.body.appendChild(modal);

// Mostrar el cuadro de diálogo al hacer clic en el botón
document.getElementById('boton').addEventListener('click', () => {
    // Seleccionar un mensaje aleatorio
    const mensajeAleatorio = mensajesPositivos[Math.floor(Math.random() * mensajesPositivos.length)];
    message.textContent = mensajeAleatorio;
    modal.style.display = 'block';
});