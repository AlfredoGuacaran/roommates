import fs from 'fs';

async function refreshRoommates() {
  try {
    const dataBaseRoommates = JSON.parse(
      fs.readFileSync('./roommates.json', 'utf-8')
    );
    const dataBaseGastos = JSON.parse(
      fs.readFileSync('./gastos.json', 'utf-8')
    );
    const { gastos } = dataBaseGastos;
    let { roommates } = dataBaseRoommates;

    const totalGastosRoomates = gastos
      .map((gasto) => +gasto.monto)
      .reduce((total, monto) => total + monto, 0);
    const gastoPromedio = totalGastosRoomates / roommates.length;

    roommates = roommates.map(({ id, nombre, debe, recibe }) => {
      const gastosXnombre = gastos
        .filter((gasto) => gasto.roommate == nombre)
        .map((gasto) => +gasto.monto)
        .reduce((total, monto) => total + monto, 0);

      if (gastoPromedio > gastosXnombre) {
        debe = gastoPromedio - gastosXnombre;
        recibe = 0;
      }
      if (gastoPromedio < gastosXnombre) {
        recibe = gastosXnombre - gastoPromedio;
        debe = 0;
      }

      if (gastoPromedio == gastosXnombre) {
        recibe = 0;
        debe = 0;
      }
      return { id: id, nombre: nombre, debe: debe, recibe: recibe };
    });

    fs.writeFileSync(
      'roommates.json',
      JSON.stringify({ roommates: roommates })
    );
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export default refreshRoommates;
