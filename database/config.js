const mongoose = require('mongoose');


/** Configuracion y conexion a la base de datos  */
const dbConexion = async () =>{

    try {
        await mongoose.connect( process.env.DB_CON , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } );

        console.log('DB en linea');

    } catch (error) {
        console.log( error );
        throw new Error('no se pudo iniciar la BD')
    }
}

module.exports = {
    dbConexion
}