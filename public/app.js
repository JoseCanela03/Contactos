document.getElementById('form-contacto').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const email = document.getElementById('email').value.trim();
  const empresa = document.getElementById('empresa').value.trim();

  if (nombre.length < 2) {
    alert('El nombre debe tener al menos 2 caracteres');
    return;
  }

  const telefonoRegex = /^[0-9]{7,15}$/;
  if (!telefonoRegex.test(telefono)) {
    alert('El teléfono debe contener solo números (7 a 15 dígitos)');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('El email no tiene un formato válido');
    return;
  }

  const nuevoContacto = { nombre, telefono, email, empresa };

  await fetch('/contactos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoContacto)
  });

  alert('Contacto agregado');
  e.target.reset();
  cargarContactos();
});

async function cargarContactos() {
  const res = await fetch('/contactos');
  const contactos = await res.json();

  const tbody = document.getElementById('tabla-body');
  tbody.innerHTML = '';

  contactos.forEach(c => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${c.nombre}</td>
      <td>${c.telefono}</td>
      <td>${c.email}</td>
      <td>${c.empresa || ''}</td>
    `;
    tbody.appendChild(fila);
  });
}

// Cargar la tabla al abrir la página
document.addEventListener('DOMContentLoaded', cargarContactos);