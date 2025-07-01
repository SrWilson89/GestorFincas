async function exportFinca() {
  const params = new URLSearchParams(window.location.search);
  const finca = getFincaById(params.get('id'));
  if (!finca) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16).text(finca.nombre, 10, 20);
  doc.setFontSize(12).text(`Dirección: ${finca.direccion}`,10,30);

  let y = 40;
  function addSection(title, items) {
    doc.setFontSize(14).text(title,10,y); y+=6;
    doc.setFontSize(11);
    items.forEach(i => {
      doc.text(`- ${i.fecha} | ${i.descripcion||i.tipo||i.banco} | €${i.monto||i.saldo}`, 10, y);
      y+=6;
    });
    y+=4;
  }

  addSection('Ingresos', finca.ingresos);
  addSection('Gastos', finca.gastos);
  addSection('Cuentas', finca.cuentas.map(c => ({ fecha: '', descripcion: c.banco, monto: c.saldo })));

  doc.save(`${finca.nombre}.pdf`);

  // Excel
  const wb = XLSX.utils.book_new();
  wb.Props = { Title: finca.nombre };
  const ws_data = [
    ['Tipo','Fecha','Descripción','Monto/Saldo']
    , ...finca.ingresos.map(i=>['Ingreso',i.fecha,i.descripcion,i.monto])
    , ...finca.gastos.map(g=>['Gasto',g.fecha,g.descripcion,g.monto])
    , ...finca.cuentas.map(c=>['Cuenta', '', c.banco, c.saldo])
  ];
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, "Resumen");
  XLSX.writeFile(wb, `${finca.nombre}.xlsx`);
}
async function exportFinca() {
  // ... (código existente)
  
  // ===== MEJORAS EN PDF =====
  // Añadir logo
  const logo = await loadImage('img/logo.png');
  doc.addImage(logo, 'PNG', 10, 5, 30, 15);
  
  // Añadir resumen financiero
  const totalIngresos = finca.ingresos.reduce((sum, i) => sum + i.monto, 0);
  const totalGastos = finca.gastos.reduce((sum, g) => sum + g.monto, 0);
  const balance = totalIngresos - totalGastos;
  
  doc.setFontSize(12).text(
    `Resumen: Ingresos: €${totalIngresos.toFixed(2)} | Gastos: €${totalGastos.toFixed(2)} | Balance: €${balance.toFixed(2)}`,
    10,
    40
  );
  
  // ... (resto del código)
  
  // ===== MEJORAS EN EXCEL =====
  // Añadir fila de totales
  ws_data.push([]);
  ws_data.push(['TOTAL INGRESOS', '', '', totalIngresos]);
  ws_data.push(['TOTAL GASTOS', '', '', totalGastos]);
  ws_data.push(['BALANCE', '', '', balance]);
  
  // ... (resto del código)
}