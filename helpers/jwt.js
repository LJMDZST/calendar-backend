const jwt = require('jsonwebtoken');

/** Generador de Json Web Token para el token del ususario */
const generarJWT = (uid, name) => {
    return new Promise( (resolve,reject) => {

        const payload = {uid, name};

        // Token con firma de la variable de entorno
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn : '2hr' // expira en 2 horas
        }, (err, token)  => {
            if( err){
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve( token );
        
        });

    })
}

module.exports = {
    generarJWT
}