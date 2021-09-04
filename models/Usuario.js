const {Schema, model} = require('mongoose');


// Estructura del modelo de datos de Usuario ( estructura de la tabla )
const UsuarioSchema = Schema({
    // campo
    name : {
        type: String,
        required: true
    },
    // campo
    email : {
        type: String,
        required: true,
        unique: true
    },
    // campo
    pass: {
        type: String,
        required: true
    }
    
    

});


module.exports = model('Usuario', UsuarioSchema);