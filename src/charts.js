// Ruta del archivo Excel en el servidor
const excelFilePathSecond = 'https://zairelyshdz.github.io/caidas_agencias_banfanb/Libro1.xlsx?.nocache=' + new Date().getTime();

// Función para cargar y procesar el archivo Excel
function loadExcelFile() {
    fetch(excelFilePathSecond)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0]; // Índice 0 corresponde a la primera hoja
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            console.log(jsonData);

            // Procesar los datos del Excel
            const labels = [];
            const values = [];
            //const horasCaida = [];
            //const horasRestablecimiento = [];

            jsonData.forEach(row => {
                if (row['AGENCIAS'] && row['TOTAL DE FALLAS'] /*&& row['CAIDA'] && row['RESTABLECIMIENTO']*/) { // Verifica que las columnas existan
                    labels.push(row['AGENCIAS']);
                    values.push(row['TOTAL DE FALLAS']);
                    /*horasCaida.push(row['CAIDA']);
                    horasRestablecimiento.push(row['RESTABLECIMIENTO']);*/
                }
            });

            // Generar el gráfico
            const ctx = document.getElementById('mySecondChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar', // Cambia a 'pie', 'line', etc., según el tipo de gráfico
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'SIN ENERGÍA ELÉCTRICA',
                        data: values,
                        backgroundColor: ['#13346a', '#014ba0', '#0838a8', '#7593ba', '#96b3ff'],
                    }],
                },
                options: {
                    responsive: true,
                    plugins: {
                        /*tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    const index = tooltipItem.dataIndex; 
                                    const horaCaida = horasCaida[index];
                                    const horaRestablecimiento = horasRestablecimiento[index];
                                    const totalFallas = values[index];
                                    return [
                                        `Total Fallas: ${totalFallas}`,
                                        `Hora de Caída: ${horaCaida}`,
                                        `Hora de Restablecimiento: ${horaRestablecimiento}`
                                    ];
                                }
                            }
                        },*/
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
                            },
                            beginAtZero: true,
                            max: 20,
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al cargar el archivo Excel:', error));
}

// Cargar el archivo Excel al cargar la página
loadExcelFile();
