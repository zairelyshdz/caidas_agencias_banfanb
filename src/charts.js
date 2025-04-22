// Ruta del archivo Excel en el servidor
const excelFilePathSecond = 'http://localhost/workspace/Libro1.xlsx?.nocache = $newDate().getTime()';

// Función para cargar y procesar el archivo Excel
function loadExcelFile() {
    fetch(excelFilePath)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });

            // Accede al nombre de la segunda hoja
            const sheetName = workbook.SheetNames[1]; // Índice 1 corresponde a la segunda hoja
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet); // Convertir a JSON

            console.log(jsonData); // Verifica los datos en la consola

            // Procesar los datos del Excel
            const labels = [];
            const values = [];

            jsonData.forEach(row => {
                if (row['AGENCIAS'] && row['TOTAL DE FALLAS']) { // Verifica que las columnas existan
                    labels.push(row['AGENCIAS']);
                    values.push(row['TOTAL DE FALLAS']); 
                }
            });

            // Generar el gráfico
            const ctx = document.getElementById('mySecondChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar', // Cambia a 'pie', 'line', etc., según el tipo de gráfico
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'CAÍDAS DIARIAS',
                        data: values,
                        backgroundColor: ['#13346a', '#0838a8', '#7593ba'],
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return value; // Devuelve el valor tal cual
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al cargar el archivo Excel:', error));
}

// Cargar el archivo Excel al cargar la página
loadExcelFile();
