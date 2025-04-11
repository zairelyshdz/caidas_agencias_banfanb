function actualizarReloj() {
    const ahora = new Date();

    const opcionesFechas = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    document.getElementById('fecha').textContent = ahora.toLocaleDateString('es-ES', opcionesFechas);

    const opcionesHora = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    document.getElementById('hora').textContent = ahora.toLocaleTimeString('es-ES', opcionesHora);
}


setInterval(actualizarReloj, 1000);


actualizarReloj();





