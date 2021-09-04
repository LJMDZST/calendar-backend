const express = require('express');
const { dbConexion } = require('./database/config.js');
const cors = require('cors');

require('dotenv').config();


const app = express();

// base de datos
dbConexion();

// CORS
app.use( cors());

// enlazar carpeta public con index.html
app.use( express.static( 'public' ) );


// lectura y parse del body de la request
app.use( express.json() );

//Rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

app.listen(process.env.PORT, ()=>{
    console.log( `Server en ${process.env.PORT}`);
});



