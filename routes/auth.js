// Router que asigna cada ruta de auth al servicio que 
// le corresponde ( middlewares )

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const router = Router();

const {
    crearUsuario,
    loguearUsuario,
    renovarToken
} = require('../controllers/auth.js');

// HTTP POST
router.post(
        '/new',
        [// middlewares de validacion del body de la solicitud http
            check('name','el nombre es obligatorio').not().isEmpty(),
            check('email','formato de email incorrecto').isEmail(),
            check('pass','min 5 caracteres').isLength( { min:5 } ),
            validarCampos // custom middleware de validacion (para no repetir codigo)
        ] 
        ,crearUsuario  
    );

// HTTP POST
router.post(
        '/',
        [
            check('email','email obligatorio').not().isEmpty(),
            check('email','formato de email incorrecto').isEmail(),
            check('pass','min 5 caracteres').isLength( { min:5 } ),
            validarCampos
        ] ,
        loguearUsuario 
    );

// HTTP GET
router.get('/renew',validarJWT,renovarToken );


module.exports = router;