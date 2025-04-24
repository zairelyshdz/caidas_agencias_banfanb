const excelFilePathThird = 'http://localhost/workspace/Libro1.xlsx?.nocache=' + new Date().getTime();

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

// Procesar datos diarios y mostrar los fallos por día
function processDailyData(sheetData) {
    const dailyCounts = {
        labels: [], // Días de la semana
        data: []    // Fallos correspondientes
    };

    sheetData.forEach(row => {
        if (row.Días && row['Fallos']) { 
            dailyCounts.labels.push(row.Días); // Agrega el día (Lunes, Martes, etc.)
            dailyCounts.data.push(parseInt(row['Fallos'], 10) || 0); 
        }
    });

    return dailyCounts;
}

// Función principal para cargar el archivo Excel
function loadExcelFile() {
    fetch(excelFilePathThird)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });

            // Procesar Hoja1 (Datos diarios)
            const dailySheet = workbook.Sheets[workbook.SheetNames[2]]; 
            const dailyJson = XLSX.utils.sheet_to_json(dailySheet);

            console.log('Datos cargados del Excel:', dailyJson); 

            // Generar gráfico diario
            const dailyData = processDailyData(dailyJson);
            createDailyChart(dailyData);
        })
        .catch(error => console.error('Error al cargar el archivo Excel:', error));
}

// Función para crear gráfico DIARIO
function createDailyChart({ labels, data }) {
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    if (weeklyChart) weeklyChart.destroy();
    weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels, // Días de la semana
            datasets: [{
                label: 'Fallos por Día',
                data: data, // Fallos correspondientes
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
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