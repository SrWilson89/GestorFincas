document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const fincaId = params.get('id');
  const finca = getFincaById(fincaId);

  if (!finca) return alert("Finca no encontrada");

  window.fincaId = finca.id; // Guardamos para reutilizar
  document.getElementById('fincaNombre').textContent = finca.nombre;
  document.getElementById('fincaDireccion').textContent = finca.direccion;

  renderGastos(finca);
  renderCuentas(finca);
  renderIngresos(finca);
});

function renderGastos(finca) {
  const lista = document.getElementById('listaGastos');
  lista.innerHTML = '';
  finca.gastos.forEach(g => {
    const li = document.createElement('li');
    li.innerHTML = `${g.fecha} - ${g.tipo}: €${g.monto} (${g.descripcion})
      <button onclick="editarGasto(${g.id})">✏️</button>
      <button onclick="borrarGasto(${g.id})">🗑️</button>`;
    lista.appendChild(li);
  });
}

function renderCuentas(finca) {
  const lista = document.getElementById('listaCuentas');
  lista.innerHTML = '';
  finca.cuentas.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `${c.banco} - ${c.iban} (Saldo: €${c.saldo})
      <button onclick="editarCuenta(${c.id})">✏️</button>
      <button onclick="borrarCuenta(${c.id})">🗑️</button>`;
    lista.appendChild(li);
  });
}

function renderIngresos(finca) {
  const lista = document.getElementById('listaIngresos');
  lista.innerHTML = '';
  finca.ingresos = finca.ingresos || [];
  finca.ingresos.forEach(i => {
    const li = document.createElement('li');
    li.innerHTML = `${i.fecha} - €${i.monto}: ${i.descripcion}
      <button onclick="editarIngreso(${i.id})">✏️</button>
      <button onclick="borrarIngreso(${i.id})">🗑️</button>`;
    lista.appendChild(li);
  });
}

// GASTOS
function añadirGasto() {
  const finca = getFincaById(fincaId);
  const tipo = prompt("Tipo de gasto:");
  const descripcion = prompt("Descripción:");
  const monto = parseFloat(prompt("Monto (€):"));
  const fecha = prompt("Fecha (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);

  if (tipo && descripcion && monto && fecha) {
    finca.gastos.push({ id: Date.now(), tipo, descripcion, monto, fecha });
    updateFinca(finca);
    location.reload();
  }
}

function editarGasto(gastoId) {
  const finca = getFincaById(fincaId);
  const gasto = finca.gastos.find(g => g.id === gastoId);
  gasto.tipo = prompt("Tipo:", gasto.tipo);
  gasto.descripcion = prompt("Descripción:", gasto.descripcion);
  gasto.monto = parseFloat(prompt("Monto (€):", gasto.monto));
  gasto.fecha = prompt("Fecha:", gasto.fecha);
  updateFinca(finca);
  location.reload();
}

function borrarGasto(gastoId) {
  const finca = getFincaById(fincaId);
  finca.gastos = finca.gastos.filter(g => g.id !== gastoId);
  updateFinca(finca);
  location.reload();
}

// CUENTAS
function añadirCuenta() {
  const finca = getFincaById(fincaId);
  const banco = prompt("Banco:");
  const iban = prompt("IBAN:");
  const saldo = parseFloat(prompt("Saldo:"));
  finca.cuentas.push({ id: Date.now(), banco, iban, saldo });
  updateFinca(finca);
  location.reload();
}

function editarCuenta(cuentaId) {
  const finca = getFincaById(fincaId);
  const cuenta = finca.cuentas.find(c => c.id === cuentaId);
  cuenta.banco = prompt("Banco:", cuenta.banco);
  cuenta.iban = prompt("IBAN:", cuenta.iban);
  cuenta.saldo = parseFloat(prompt("Saldo:", cuenta.saldo));
  updateFinca(finca);
  location.reload();
}

function borrarCuenta(cuentaId) {
  const finca = getFincaById(fincaId);
  finca.cuentas = finca.cuentas.filter(c => c.id !== cuentaId);
  updateFinca(finca);
  location.reload();
}

// INGRESOS
function añadirIngreso() {
  const finca = getFincaById(fincaId);
  finca.ingresos = finca.ingresos || [];
  const descripcion = prompt("Descripción:");
  const monto = parseFloat(prompt("Monto (€):"));
  const fecha = prompt("Fecha (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);

  if (descripcion && monto && fecha) {
    finca.ingresos.push({ id: Date.now(), descripcion, monto, fecha });
    updateFinca(finca);
    location.reload();
  }
}

function editarIngreso(id) {
  const finca = getFincaById(fincaId);
  const ingreso = finca.ingresos.find(i => i.id === id);
  ingreso.descripcion = prompt("Descripción:", ingreso.descripcion);
  ingreso.monto = parseFloat(prompt("Monto:", ingreso.monto));
  ingreso.fecha = prompt("Fecha:", ingreso.fecha);
  updateFinca(finca);
  location.reload();
}

function borrarIngreso(id) {
  const finca = getFincaById(fincaId);
  finca.ingresos = finca.ingresos.filter(i => i.id !== id);
  updateFinca(finca);
  location.reload();
}
