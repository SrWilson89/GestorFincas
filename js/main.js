document.addEventListener('DOMContentLoaded', () => {
  const fincas = getFincas();
  const listDiv = document.getElementById('fincasList');
  listDiv.innerHTML = '';

  fincas.forEach(finca => {
    const card = document.createElement('div');
    card.className = 'finca-card';
    card.innerHTML = `
      <h3>${finca.nombre}</h3>
      <p>${finca.direccion}</p>
      <button onclick="verFinca(${finca.id})">👁️ Ver</button>
      <button onclick="editarFinca(${finca.id})">✏️ Editar</button>
      <button onclick="eliminarFinca(${finca.id})">🗑️ Borrar</button>
    `;
    listDiv.appendChild(card);
  });
});

function crearFinca() {
  const nombre = prompt("Nombre de la finca:");
  const direccion = prompt("Dirección:");
  if (nombre && direccion) {
    addFinca({ nombre, direccion, gastos: [], cuentas: [], ingresos: [] });
    location.reload();
  }
}

function verFinca(id) {
  window.location.href = `finca.html?id=${id}`;
}

function editarFinca(id) {
  const fincas = getFincas();
  const finca = fincas.find(f => f.id === id);
  if (!finca) return;

  const nombre = prompt("Nuevo nombre:", finca.nombre);
  const direccion = prompt("Nueva dirección:", finca.direccion);

  if (nombre && direccion) {
    finca.nombre = nombre;
    finca.direccion = direccion;
    updateFinca(finca);
    location.reload();
  }
}

function eliminarFinca(id) {
  if (confirm("¿Seguro que deseas eliminar esta finca?")) {
    const fincas = getFincas().filter(f => f.id !== id);
    saveFincas(fincas);
    location.reload();
  }
}
async function crearFinca() {
  const { value } = await promptFinca();
  if (value) { … }
}
// ... (código existente)

// Función mejorada para crear fincas
async function crearFinca() {
  const { value } = await Swal.fire({
    title: 'Nueva Finca',
    html: `
      <input id="nombre" class="swal2-input" placeholder="Nombre">
      <input id="direccion" class="swal2-input" placeholder="Dirección">
      <input id="hectareas" type="number" class="swal2-input" placeholder="Hectáreas">
    `,
    preConfirm: () => {
      return {
        nombre: document.getElementById('nombre').value,
        direccion: document.getElementById('direccion').value,
        hectareas: document.getElementById('hectareas').value
      }
    }
  });

  if (value) {
    addFinca({ 
      ...value, 
      gastos: [], 
      cuentas: [], 
      ingresos: [],
      hectareas: parseFloat(value.hectareas) || 0
    });
    location.reload();
  }
}

// Renderizado mejorado de tarjetas
document.addEventListener('DOMContentLoaded', () => {
  const fincas = getFincas();
  const listDiv = document.getElementById('fincasList');
  listDiv.innerHTML = '';
  
  fincas.forEach(finca => {
    const totalIngresos = finca.ingresos.reduce((sum, i) => sum + i.monto, 0);
    const totalGastos = finca.gastos.reduce((sum, g) => sum + g.monto, 0);
    const balance = totalIngresos - totalGastos;
    
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${finca.nombre}</h5>
          <p class="card-text">${finca.direccion}</p>
          <p class="card-text">${finca.hectareas || 0} hectáreas</p>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="badge bg-${balance >= 0 ? 'success' : 'danger'}">
              Balance: €${balance.toFixed(2)}
            </span>
            <div>
              <button class="btn btn-sm btn-outline-primary" onclick="verFinca(${finca.id})">
                👁️ Ver
              </button>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <button class="btn btn-sm btn-outline-secondary" onclick="editarFinca(${finca.id})">
            ✏️ Editar
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarFinca(${finca.id})">
            🗑️ Borrar
          </button>
        </div>
      </div>
    `;
    listDiv.appendChild(card);
  });
});