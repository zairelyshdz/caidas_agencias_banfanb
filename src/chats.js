
const ctx = document.getElementById('myChart');
      
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1
        }]
    },
        options: {
        scales: {
            y: {
              beginAtZero: true
              }
            }
          }
        });
  
const datasets ={
    dataset1:{
        labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        data: [65,59,80,81],
        label: 'Agencias',
        borderColor:'#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
    },

    dataset2:{
        labels: ['Lun','Mar','Mie','Jue','Vie','Sab','Dom'],
        data: [65,59,80,81],
        label: 'Agencias',
        borderColor:'#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
    },

    dataset3:{
        labels: ['01','02','03','04','05','06','07','08','09','10','11','12'],
        data: [65,59,80,81],
        label: 'Agencias',
        borderColor:'#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
    },
};

let myChart = new Chart(document.getElementById('myChart'), {
    type: 'line',
    data: {
        labels: datasets.dataset1.labels,
        datasets: [{
            label: datasets.dataset1.label,
            data: datasets.dataset1.data,
            borderColor: datasets.dataset1.borderColor,
            backgroundColor: datasets.dataset1.backgroundColor,
            fill: true
        }]
    }
});

const dataSelector = document.getElementById('dataSelector');

const selectedDataset = event.target.value;
dataSelector.addEventListener('change',(event) =>{
    myChart.data.labels = chartDatasets[selectedDataset].labels;
    myChart.data.datasets[0].data = chartDatasets[selectedDataset].data;
    myChart.data.datasets[0].label = chartDatasets[selectedDataset].label;
    myChart.data.datasets[0].backgroundColor = chartDatasets[selectedDataset].backgroundColor;

    myChart.update();
})

