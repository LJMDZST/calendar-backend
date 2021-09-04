const {response} = require('express');
const jwt = require('jsonwebtoken');

/** Middleware para verificar que el token sea valido antes de 
 *  renovarlo. Esto sirve para verificar que el usuario sea verdadero
*/
const validarJWT = (req , res = response , next )=>{

    // En este app el token se recibe en los headers
    const token = req.header('x-token');
    
    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token'
        })
    }
    try {
        
        // verificacion que el token sea valido con la firma de 
        // la variable SECRET_JWT_SEED
        const { uid, name }= jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    // pasa al siguiente metodo / bloque de codigo
    next();

}


module.exports = {
    validarJWT,
}