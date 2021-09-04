const {Schema, model} = require('mongoose');

const EventoSchema = Schema({

    title :{
        type: String,
        required: true
    },
    start:{
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    notes:{
        type: String
    },
    user: {
        // Referencia a un registro de la tabla usuario (Relacion)
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }


});

// Personalizacion de los nombres de los campos( _id por id y sin __v)
EventoSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model('Evento', EventoSchema);