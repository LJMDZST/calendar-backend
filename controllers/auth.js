// Handlers de los endpoints de cada url
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario.js');
const { generarJWT } = require('../helpers/jwt.js');



// HTTP POST
const crearUsuario = async (req, res = response )=>{
    
    // body de la consulta http
    const  { email, pass } = req.body
    try {

        let oUsuario = await Usuario.findOne( {email} );
     

        if( oUsuario ){
            return res.status(200).json({
                ok: true,
                msg: 'ya existe un usuario con ese email' 
            })
        }

        oUsuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync( );
        oUsuario.pass = bcrypt.hashSync( pass, salt );

        // guardar ususario en la BD.
        await oUsuario.save();

        // Generar JWT
        // la promesa se implemento manualmente
        const token = await generarJWT( oUsuario.id, oUsuario.name );


        res.status(200).json({
            ok: true,
            uid: oUsuario.id,
            name : oUsuario.name,
            token
        })
        
    } catch (error) {
        // si save dio error, por seguridad se recomienda no 
        // mostrar que error fue
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contacte con el administrador'
        })
    }


}
//HTTP POST
const loguearUsuario = async (req,res = response)=>{

    // body de la consulta http
    const  { email, pass } = req.body

    try {

        let oUsuario = await Usuario.findOne( {email} );
     

        if( !oUsuario ){
            return res.status(200).json({
                ok: true,
                msg: 'No existe un usuario con ese email' 
            })
        }

        // comparar las pass
        const validPass = bcrypt.compareSync( pass, oUsuario.pass);
        if( ! validPass ){
            return res.status(400).json({
                ok: true,
                msg: ' Pass incorrecto' 
            })
        }

        // Generar JWT

        const token = await generarJWT( oUsuario.id, oUsuario.name );


        res.status(200).json({
            ok: true,
            uid: oUsuario.id,
            name : oUsuario.name,
            token
        })
        
    } catch (error) {
        // si save dio error, por seguridad se recomienda no 
        // mostrar que error fue
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contacte con el administrador'
        })
    }

    
}
//HTTP GET
const renovarToken = async (req,res = response)=>{

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid,name);

    res.json({
        ok: true,
        token
    })

}


module.exports = {
    crearUsuario,
    loguearUsuario,
    renovarToken
}