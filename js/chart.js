// chart.js
function renderChart(finca) {
  const ctx = document.getElementById('graficaMix').getContext('2d');
  const ingresos = finca.ingresos.map(i => i.monto);
  const gastos = finca.gastos.map(g => g.monto);
  new Chart(ctx, { type: 'bar', data: { datasets: [ … ]}, options: { … } });
}
function renderChart(finca) {
  const ctx = document.getElementById('graficaMix').getContext('2d');
  
  // Preparar datos para el gráfico
  const meses = [...new Set([
    ...finca.ingresos.map(i => i.fecha.slice(0, 7)),
    ...finca.gastos.map(g => g.fecha.slice(0, 7))
  ])].sort();

  const ingresosData = meses.map(mes => 
    finca.ingresos
      .filter(i => i.fecha.startsWith(mes))
      .reduce((sum, i) => sum + i.monto, 0)
  );

  const gastosData = meses.map(mes => 
    finca.gastos
      .filter(g => g.fecha.startsWith(mes))
      .reduce((sum, g) => sum + g.monto, 0)
  );

  // Crear gráfico
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: meses,
      datasets: [
        {
          label: 'Ingresos',
          data: ingresosData,
          backgroundColor: 'rgba(75, 192, 132, 0.6)',
          borderColor: 'rgba(75, 192, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Gastos',
          data: gastosData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Euros (€)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Mes'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Resumen Financiero Mensual'
        }
      }
    }
  });
}