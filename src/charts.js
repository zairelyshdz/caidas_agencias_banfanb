
  const ctx = document.getElementById('myChart');
      
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['8:30', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:30'],
      datasets: [
        {
          label: 'Sede A',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Sede B',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Sede C',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(180, 125, 61, 0.2)',
          borderColor: 'rgba(180, 125, 61, 1)',
          borderWidth: 1
        },
        {
          label: 'Sede D',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(153, 66, 235, 0.2)',
          borderColor: 'rgba(153, 66, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Sede E',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          stacked: false,
          title: {
            display: true,
          },
        },
        y: {
          stacked: false,
          title: {
            display: true,
          },
          beginAtZero: true,
          max: 30, 
        },
      },
    }
  });
