import express from 'express';
const app = express();
import fs from 'fs';
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log('Servidor corriendo en puerto 30000'));
