import express from 'express';
const app = express();
import fs from 'fs';
import newRoommate from './newRoommate.js';
import newGasto from './newGasto.js';
import refreshRoommates from './refreshRoommates.js';
import deleteGasto from './deleteGasto.js';
import putGasto from './putGasto.js';

app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/roommates', async (req, res) => {
  let roommatesJSON = await JSON.parse(
    fs.readFileSync('./roommates.json', 'utf-8')
  );
  let roommates = roommatesJSON.roommates;
  await refreshRoommates();
  res.send({ roommates });
});

app.get('/gastos', async (req, res) => {
  let gastosJSON = await JSON.parse(fs.readFileSync('./gastos.json', 'utf-8'));
  let gastos = gastosJSON.gastos;
  res.json({ gastos });
});

app.post('/gasto', async (req, res) => {
  let body;
  req.on('data', (payload) => {
    body = JSON.parse(payload);
  });
  req.on('end', async () => {
    const { roommate, descripcion, monto } = body;
    await newGasto(roommate, descripcion, monto);
    await refreshRoommates();

    res.redirect('/roommates');
  });
});

app.delete('/gasto', async (req, res) => {
  const { id } = req.query;
  console.log(id);
  await deleteGasto(id);
  await refreshRoommates();
  res.redirect('/roommates');
});

app.put('/gasto', async (req, res) => {
  const { id } = req.query;
  let body;
  req.on('data', (payload) => {
    body = JSON.parse(payload);
  });
  req.on('end', async () => {
    const { roommate, descripcion, monto } = body;

    await putGasto(id, roommate, descripcion, monto);
    await refreshRoommates();
    res.redirect('/roommates');
  });
});

app.post('/roommate', async (req, res) => {
  try {
    await newRoommate();
    res.redirect('/roommates');
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 30000'));
