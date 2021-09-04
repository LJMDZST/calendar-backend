const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} = require('../controllers/events.js');
const { isDate } = require("../helpers/isDate");


const router = Router();

// El middleware se aplica a todos los eventos
router.use( validarJWT );

// http GET
router.get('/',getEventos );
// http POST
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','La fecha inicio es obligatoria').custom( isDate ),
        check('end','La fecha fin es obligatoria').custom( isDate ),
        validarCampos
    ]
    ,crearEvento );
// http PUT
router.put('/:id',actualizarEvento );
// http DELETE
router.delete('/:id',eliminarEvento );

module.exports = router;