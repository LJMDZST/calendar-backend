const { response } = require('express');
const Evento = require('../models/Evento.js');

const getEventos = async(req , res = response)=>{

    try {
        const eventos = await Evento.find()
                                    .populate('user','name');
        
        res.json({
            ok: true,
            eventos
        })
                                    

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contacte con el administrador'
        })
    }
   

    
}
const crearEvento = async(req , res = response)=>{

    // if( < )
    // const { title, notes, start, end} = req.body;
    const evento = new Evento( req.body );

    try {   

        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        
        res.json({
            ok: true,
            eventoGuardado
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contacte con el administrador'
        })
    }

    
}
const actualizarEvento = async(req , res = response)=>{

    // se obtiene el id por parametros del uri.
    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un evento con ese id'
            })
        }

        if(  evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'no tiene permiso para realizar esta accion'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid,

        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contacte con el administrador'
        })
    }


}
const eliminarEvento = async(req , res = response)=>{

    // se obtiene el id por parametros del uri.
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId );

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un evento con ese id'
            })
        }

        if(  evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'no tiene permiso para realizar esta accion'
            })
        }

       await Evento.findByIdAndRemove( eventoId,{new: true} );

        res.json({
            ok : true,
            msg: 'Evento borrado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contacte con el administrador'
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}