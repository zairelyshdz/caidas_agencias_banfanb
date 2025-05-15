const excelFilePathThird = 'https://zairelyshdz.github.io/caidas_agencias_banfanb/Libro1.xlsx?.nocache = $newDate().getTime()';

let dailyChart;
let weeklyChart;


// Procesar datos diarios 
function processWeeklyData(sheetData) {
    const weeklyCounts = {};

    sheetData.forEach(row => {
        if (row.DIAS-3 && row['FALLOS-3']) {
            const fecha = new Date(row.DIAS-3 .split('/').reverse().join('-'));

            if (isCurrentWeek(fecha)) {
                const weekNumber = getWeekNumberInMonth(fecha);
                const monthName = fecha.toLocaleString('es-ES', { month: 'long' });

                const key = `Semana ${weekNumber} de ${monthName}`;

                if (!weeklyCounts[key]) {
                    weeklyCounts[key] = 0; 
                }
                weeklyCounts[key] += parseInt(row['FALLOS-3'], 10);
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
        if (row['DIAS-3'] && row['FALLOS-3']) { 
            dailyCounts.labels.push(row['DIAS-3']); 
            dailyCounts.data.push(parseInt(row['FALLOS-3'], 10) || 0); 
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

           
            const dailySheet = workbook.Sheets[workbook.SheetNames[5]]; 
            const dailyJson = XLSX.utils.sheet_to_json(dailySheet);

            console.log('Datos cargados del Excel:', dailyJson); // Verifica los datos en la consola

            // Generar gráfico diario
            const dailyData = processDailyData(dailyJson);
            createDailyChart(dailyData);
        })
        .catch(error => console.error('Error al cargar el archivo Excel:', error));
}

// Función para crear gráfico DIARIO
function createDailyChart({ labels, data }) {
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    if (dailyChart) dailyChart.destroy();
    dailyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels, // Días de la semana
            datasets: [{
                label: 'Fallos por Día',
                data: data, // Fallos correspondientes
                backgroundColor: ['#13346a', '#014ba0','#0838a8','#7593ba', '#96b3ff'],
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: {
                y: {
                    beginAtZero: true,
                    max:20,
                }
            }
        }
    });
}

// Cargar al iniciar
loadExcelFile();
