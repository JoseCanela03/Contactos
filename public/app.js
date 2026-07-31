document.getElementById('form-contacto').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nuevoContacto = {
    nombre: document.getElementById('nombre').value,
    telefono: document.getElementById('telefono').value,
    email: document.getElementById('email').value,
    empresa: document.getElementById('empresa').value
  };

  await fetch('/contactos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoContacto)
  });

  alert('Contacto agregado');
  e.target.reset();
});