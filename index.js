const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/configDB');
const { use } = require('./routes/auth');
require('dotenv').config();

//Crear servidor 

const app = express();

//conexion DB
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use(express.static('public'))

//Lectura del body
app.use(express.json());


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//Escuchar peticiones

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor Corriendo en puerto: ${process.env.PORT} `)
});