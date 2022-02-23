import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

async function newGasto(roommate, descripcion, monto) {
  try {
    const newGasto = {
      id: uuidv4(),
      roommate: roommate,
      descripcion: descripcion,
      monto: monto,
    };

    const dataBase = JSON.parse(fs.readFileSync('./gastos.json', 'utf-8'));
    dataBase.gastos.push(newGasto);

    fs.writeFileSync('gastos.json', JSON.stringify(dataBase));

    return dataBase;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export default newGasto;
