const ctx = document.getElementById('myThirdChart').getContext('2d');

const myThirdChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'], // Etiquetas principales
        datasets: [
            {
                label: 'Sede A',
                data: [2, 4, 0, 0, 3, 1, 6, 10, 4, 7, 0, 1],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Sede B',
                data: [0, 2, 5, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Sede C',
                data: [15, 3, 0, 20, 2, 8, 1, 1, 0, 4, 7, 7],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Sede D',
                data: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                backgroundColor: 'rgba(180, 125, 61, 0.2)',
                borderColor: 'rgb(180, 125, 61, 1)',
                borderWidth: 1,
            },
            {
                label: 'Sede E',
                data: [12, 25, 20, 15, 10, 0, 9, 5, 2, 1, 3, 4],
                backgroundColor: 'rgba(153, 66, 235, 0.2)',
                borderColor: 'rgb(153, 66, 235, 0.2)',
                borderWidth: 1,
            },
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Posición de la leyenda
            },
            tooltip: {
                mode: 'index', // Muestra información de todas las barras al pasar el mouse
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true, // Desactiva el apilamiento horizontal
                title: {
                    display: true,
                    text: 'Meses',
                },
            },
            y: {
                stacked: true, // Desactiva el apilamiento vertical
                title: {
                    display: true,
                    text: 'Cantidad',
                },
                beginAtZero: true,
                max: 30, // Asegura que el eje comience en 0
            },
        },
    }
});

