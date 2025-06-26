// chart.js
function renderChart(finca) {
  const ctx = document.getElementById('graficaMix').getContext('2d');
  const ingresos = finca.ingresos.map(i => i.monto);
  const gastos = finca.gastos.map(g => g.monto);
  new Chart(ctx, { type: 'bar', data: { datasets: [ … ]}, options: { … } });
}
