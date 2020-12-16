const {Router} = require('express');
const {check} = require('express-validator');
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/authControllers');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// localhost:4000/api/auth/new
router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser minimo de 6 caracteres').isLength({min:6}),
        validarCampos


    ], 
    crearUsuario 
);

// localhost:4000/api/auth/
router.post(
    '/', 
    [
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'El password debe de ser minimo de 6 caracteres').isLength({min:6}),
        validarCampos
    ], 
    loginUsuario
);

// localhost:4000/api/auth/renew
router.get('/renew', validarJWT, revalidarToken);






module.exports = router;