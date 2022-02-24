import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import axios from 'axios';

async function newRoommate() {
  try {
    const ramdomRoommateData = await (
      await axios.get('https://randomuser.me/api')
    ).data.results[0].name;

    const newRoommate = {
      nombre: ramdomRoommateData.first + ' ' + ramdomRoommateData.last,
      id: uuidv4(),
      debe: 0,
      recibe: 0,
      email: 'tests.alfredo@gmail.com',
    };

    const dataBase = JSON.parse(fs.readFileSync('./roommates.json', 'utf-8'));
    dataBase.roommates.push(newRoommate);

    fs.writeFileSync('roommates.json', JSON.stringify(dataBase));

    return dataBase;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export default newRoommate;
