const excelFilePathThird = `http://localhost/workspace/Libro1.xlsx?nocache=${new Date().getTime()}`;

let weeklyChart;

// Función para obtener el número de semana dentro del mes
function getWeekNumberInMonth(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfMonth = date.getDate();
    const weekNumber = Math.ceil((dayOfMonth + firstDayOfMonth.getDay()) / 7);
    return weekNumber;
}

// Verifica si la fecha ess de la semana actual
function isCurrentWeek(date) {
    const today = new Date();
    const currentWeek = getWeekNumberInMonth(today);
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return (
        date.getFullYear() === currentYear &&
        date.getMonth() === currentMonth &&
        getWeekNumberInMonth(date) === currentWeek
    );
}

// Procesar datos diarios y agruparlos por semana dentro del mes
function processWeeklyData(sheetData) {
    const weeklyCounts = {};

    sheetData.forEach(row => {
        if (row.FECHA && row.AGENCIAS && row['TOTAL DE FALLAS']) {
            const fecha = new Date(row.FECHA.split('/').reverse().join('-'));

            // Filtrar solo los datos de la semana actual
            if (isCurrentWeek(fecha)) {
                const weekNumber = getWeekNumberInMonth(fecha);
                const monthName = fecha.toLocaleString('es-ES', { month: 'long' });

                const key = `Semana ${weekNumber} de ${monthName}`;

                if (!weeklyCounts[key]) {
                    weeklyCounts[key] = 0;
                }
                weeklyCounts[key] += parseInt(row['TOTAL DE FALLAS'], 10); // Sumar las fallas
            }
        }
    });

    return {
        labels: Object.keys(weeklyCounts),
        data: Object.values(weeklyCounts)
    };
}

// Función principal para cargar ambas hojas
function loadExcelFile() {
    fetch(excelFilePathThird)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });

            // Procesar Hoja1 (Datos diarios)
            const dailySheet = workbook.Sheets[workbook.SheetNames[1]];
            const dailyJson = XLSX.utils.sheet_to_json(dailySheet);

            // Generar gráfico semanal
            const weeklyData = processWeeklyData(dailyJson);
            createWeeklyChart(weeklyData);
        })
        .catch(error => console.error('Error:', error));
}

// Función para crear gráfico SEMANAL
function createWeeklyChart({ labels, data }) {
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    if (weeklyChart) weeklyChart.destroy();
    weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total de Fallos Semanales (Semana Actual)',
                data: data,
                backgroundColor: '#0e235c',
                borderColor: '#0e235c',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Número de Fallos' }
                }
            }
        }
    });
}

// Cargar al iniciar
loadExcelFile();