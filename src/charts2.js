const ctx2 = document.getElementById('mySecondChart').getContext('2d');


const datasets = {
    dataset1:
        {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        data: [65, 59, 80, 81,90, 0, 60, 35, 12, 5, 50 , 70],
        label: 'Agencias', 
        borderColor: '#ff6384',
        borderWidth: 1,
        backgroundColor: 'rgba(177, 60, 86, 0.2)'
    },
    dataset2: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        data: [45, 39, 60, 71],
        label: 'Agencias',
        borderColor: '#36a2eb',
        borderWidth: 1,
        backgroundColor: 'rgba(18, 111, 173, 0.2)'
    },
    dataset3: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        data: [25, 49, 70, 91],
        label: 'Agencias',
        borderColor: '#4bc0c0',
        borderWidth: 1,
        backgroundColor: 'rgba(0, 99, 99, 0.2)'
    },
    dataset3: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        data: [25, 49, 70, 91],
        label: 'Agencias',
        borderColor: '#4bc0c0',
        borderWidth: 1,
        backgroundColor: 'rgba(179, 26, 64, 0.2)'
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
                stacked: false, // Desactiva el apilamiento horizontal
                title: {
                    display: true,
                },
            },
            y: {
                stacked: false, // Desactiva el apilamiento vertical
                title: {
                    display: true,
                },
                beginAtZero: true,
                max: 30, // Asegura que el eje comience en 0
            },
        },
    }
};


let mySecondChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: datasets.dataset1.labels,
        datasets: [{
            label: datasets.dataset1.label,
            data: datasets.dataset1.data,
            borderColor: datasets.dataset1.borderColor,
            backgroundColor: datasets.dataset1.backgroundColor,
            fill: true
        }]
    },
    options: {
        responsive: true
    }
});


const dataSelector = document.getElementById('dataSelector');
dataSelector.addEventListener('change', (event) => {
    const selectedDataset = event.target.value;


    mySecondChart.data.labels = datasets[selectedDataset].labels;
    mySecondChart.data.datasets[0].data = datasets[selectedDataset].data;
    mySecondChart.data.datasets[0].label = datasets[selectedDataset].label;
    mySecondChart.data.datasets[0].borderColor = datasets[selectedDataset].borderColor;
    mySecondChart.data.datasets[0].backgroundColor = datasets[selectedDataset].backgroundColor;

    mySecondChart.update();
});