import express from 'express';
const app = express();
import fs from 'fs';
import newRoommate from './newRoommate.js';
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/roommates', async (req, res) => {
  let roommatesJSON = await JSON.parse(
    fs.readFileSync('./roommates.json', 'utf-8')
  );
  let roommates = roommatesJSON.roommates;
  // console.log(roommatesJSON);
  res.json({ roommates });
});

app.get('/gastos', async (req, res) => {
  let gastosJSON = await JSON.parse(fs.readFileSync('./gastos.json', 'utf-8'));
  let gastos = gastosJSON.gastos;
  console.log(gastos);
  res.json({ gastos });
});

app.post('/gasto', async (req, res) => {});

app.post('/roommate', async (req, res) => {
  try {
    const newDataBase = await newRoommate();
    res.end();
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 30000'));
