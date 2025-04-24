const excelFilePathThird = 'http://localhost/workspace/Libro1.xlsx?.nocache=' + new Date().getTime();

let weeklyChart;

// para obtener el número de semana dentro del mes
function getWeekNumberInMonth(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfMonth = date.getDate();
    const weekNumber = Math.ceil((dayOfMonth + firstDayOfMonth.getDay()) / 7);
    return weekNumber;
}

// Función para crear gráfico SEMANAL
function createWeeklyChart(weeklyData) {
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    if (weeklyChart) weeklyChart.destroy();
    weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weeklyData.labels,
            datasets: [{
                label: 'Total de Fallos Semanales',
                data: weeklyData.data,
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

// Función principal para cargar el archivo Excel
function loadExcelFile() {
    fetch(excelFilePathThird)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });

            // Seleccionar la hoja correspondiente
            const sheetName = workbook.SheetNames[2]; // Índice 2 corresponde a la tercera hoja
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            console.log(jsonData); // Verifica los datos en la consola

            // Procesar los datos del Excel
            const labels = [];
            const values = [];

            jsonData.forEach(row => {
                if (row['SEMANA-1']) { // Verifica que la columna 'SEMANA-1' exista
                    const totalFallas = 
                        (parseInt(row['Lunes']) || 0) +
                        (parseInt(row['Martes']) || 0) +
                        (parseInt(row['Miércoles']) || 0) +
                        (parseInt(row['Jueves']) || 0) +
                        (parseInt(row['Viernes']) || 0);

                    labels.push(row['SEMANA-1']); 
                    values.push(totalFallas);
                }
            });

            // Generar el gráfico
            createWeeklyChart({ labels, data: values });
        })
        .catch(error => console.error('Error al cargar el archivo Excel:', error));
}

// Cargar al iniciar
loadExcelFile();
