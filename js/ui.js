// ui.js
function promptFinca(finca) {
  return Swal.fire({
    title: finca ? 'Editar finca' : 'Nueva finca',
    html: `
      <input id="nombre" class="swal2-input" placeholder="Nombre" value="${finca?.nombre||''}">
      <input id="direccion" class="swal2-input" placeholder="Dirección" value="${finca?.direccion||''}">
    `,
    focusConfirm: false,
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector('#nombre').value;
      const direccion = Swal.getPopup().querySelector('#direccion').value;
      if (!nombre || !direccion) Swal.showValidationMessage('Completa todos los campos');
      return { nombre, direccion };
    }
  });
}
