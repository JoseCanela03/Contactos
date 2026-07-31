const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'data', 'contactos.json');

app.use(express.json());
app.use(express.static('public'));

function leerContactos() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function guardarContactos(contactos) {
  fs.writeFileSync(DB_FILE, JSON.stringify(contactos, null, 2));
}

app.get('/contactos', (req, res) => {
  res.json(leerContactos());
});

app.get('/contactos/:id', (req, res) => {
  const contactos = leerContactos();
  const contacto = contactos.find(c => c.id === req.params.id);
  if (!contacto) return res.status(404).json({ error: 'No encontrado' });
  res.json(contacto);
});

app.post('/contactos', (req, res) => {
  const contactos = leerContactos();
  const nuevo = { id: Date.now().toString(), ...req.body };
  contactos.push(nuevo);
  guardarContactos(contactos);
  res.status(201).json(nuevo);
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));