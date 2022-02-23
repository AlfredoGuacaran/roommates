import fs from 'fs';
async function deleteGasto(id) {
  try {
    let { gastos } = JSON.parse(fs.readFileSync('./gastos.json', 'utf-8'));
    gastos = gastos.filter((gasto) => gasto.id !== id);
    fs.writeFileSync('gastos.json', JSON.stringify({ gastos }));
  } catch (error) {
    console.log(error.menssage);
    throw error;
  }
}

export default deleteGasto;
