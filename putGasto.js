import fs from 'fs';

async function newGasto(id, newRoommate, newDescripcion, newMonto) {
  try {
    let { gastos } = JSON.parse(fs.readFileSync('./gastos.json', 'utf-8'));

    gastos = gastos.map((gasto) => {
      if (id == gasto.id) {
        return {
          id: gasto.id,
          roommate: newRoommate,
          descripcion: newDescripcion,
          monto: newMonto,
        };
      } else return gasto;
    });

    fs.writeFileSync('gastos.json', JSON.stringify({ gastos }));
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export default newGasto;
