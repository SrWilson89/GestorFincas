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
// ... (código existente)

// ===== GASTOS =====
async function añadirGasto() {
  const finca = getFincaById(fincaId);
  const { value: formValues } = await Swal.fire({
    title: 'Nuevo Gasto',
    html: `
      <input id="tipo" class="swal2-input" placeholder="Tipo">
      <input id="descripcion" class="swal2-input" placeholder="Descripción">
      <input id="monto" type="number" class="swal2-input" placeholder="Monto (€)" step="0.01">
      <input id="fecha" type="date" class="swal2-input" value="${new Date().toISOString().split('T')[0]}">
    `,
    focusConfirm: false,
    preConfirm: () => {
      return {
        tipo: document.getElementById('tipo').value,
        descripcion: document.getElementById('descripcion').value,
        monto: parseFloat(document.getElementById('monto').value),
        fecha: document.getElementById('fecha').value
      }
    }
  });

  if (formValues) {
    finca.gastos.push({ 
      id: Date.now(), 
      ...formValues 
    });
    updateFinca(finca);
    renderGastos(finca);
  }
}

async function editarGasto(gastoId) {
  // ... (similar a añadirGasto pero con valores precargados)
}

function borrarGasto(gastoId) {
  // ... (usar Swal.fire para confirmación)
}

// ===== CUENTAS =====
async function añadirCuenta() {
  // ... (similar a añadirGasto)
}

// ===== INGRESOS =====
async function añadirIngreso() {
  // ... (similar a añadirGasto)
}

// ===== FUNCIONES DE RENDERIZADO MEJORADAS =====
function renderLista(elementId, items, fields, actions) {
  const lista = document.getElementById(elementId);
  lista.innerHTML = '';
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    let content = '';
    fields.forEach(field => {
      content += `<span>${field.label}: ${item[field.key]}</span> `;
    });
    
    li.innerHTML = `
      <div>${content}</div>
      <div>
        ${actions.map(action => `
          <button class="btn btn-sm ${action.class}" 
                  onclick="${action.fn}(${item.id})">
            ${action.icon}
          </button>
        `).join('')}
      </div>
    `;
    lista.appendChild(li);
  });
}

// Actualizar funciones de renderizado
function renderGastos(finca) {
  renderLista('listaGastos', finca.gastos, [
    { key: 'fecha', label: 'Fecha' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'monto', label: 'Monto' }
  ], [
    { icon: '✏️', class: 'btn-outline-warning', fn: 'editarGasto' },
    { icon: '🗑️', class: 'btn-outline-danger', fn: 'borrarGasto' }
  ]);
}

// ... (similar para cuentas e ingresos)