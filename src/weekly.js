const excelFilePathThird = 'http://localhost/workspace/Libro1.xlsx?.nocache = $newDate().getTime()';

let weeklyChart;

// para obtener el número de semana dentro del mes
function getWeekNumberInMonth(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfMonth = date.getDate();
    const weekNumber = Math.ceil((dayOfMonth + firstDayOfMonth.getDay()) / 7);
    return weekNumber;
}

// Verifica si la fecha pertenece a la semana actual
function isCurrentWeek(date) {
    const currentDate = new Date();
    const currentWeekNumber = getWeekNumberInMonth(currentDate);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const dateWeekNumber = getWeekNumberInMonth(date);
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    return currentWeekNumber === dateWeekNumber && currentMonth === dateMonth && currentYear === dateYear;
}

// Procesar datos diarios y agruparlos por semana dentro del mes
function processWeeklyData(sheetData) {
    const weeklyCounts = {};

    sheetData.forEach(row => {
        if (row.Días && row['Fallos']) {
            const fecha = new Date(row.Días.split('/').reverse().join('-'));

            if (isCurrentWeek(fecha)) {
                const weekNumber = getWeekNumberInMonth(fecha);
                const monthName = fecha.toLocaleString('es-ES', { month: 'long' });

                const key = `Semana ${weekNumber} de ${monthName}`;

                if (!weeklyCounts[key]) {
                    weeklyCounts[key] = 0;
                }
                weeklyCounts[key] += parseInt(row['Fallos'], 10);
            }
        }
    });
    return weeklyCounts;
}

// Función principal para cargar ambas hojas
function loadExcelFile() {
    fetch(excelFilePathThird)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });

            // Procesar Hoja1 (Datos diarios)
            const dailySheet = workbook.Sheets[workbook.SheetNames[2]];
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
                label: 'Total de Fallos Semanales',
                data: data,
                borderColor: '#0e235c',
                fill: false,
                tension: 0.1
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