// Modulo para manipular datos en LocalStorage

const STORAGE_KEY = 'fincas-data';

function getFincas() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveFincas(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function addFinca(finca) {
  const fincas = getFincas();
  finca.id = Date.now();
  fincas.push(finca);
  saveFincas(fincas);
}

function getFincaById(id) {
  return getFincas().find(f => f.id === parseInt(id));
}

function updateFinca(updated) {
  let fincas = getFincas();
  fincas = fincas.map(f => f.id === updated.id ? updated : f);
  saveFincas(fincas);
}
