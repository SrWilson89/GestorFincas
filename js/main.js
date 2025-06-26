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