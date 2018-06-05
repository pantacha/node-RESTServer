const jwt = require('jsonwebtoken');


//Verificar el token para acceder a la informacion del usuario
let validarToken = (req, res, next) => {

    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Unhautorized'
                }
            })
        }
        req.usuario = decoded.usuario;
        next();
    })
    console.log(token);


};

//Verifica el Role del admin para que sólo éste pueda actualizar y crear nuevos usuarios
let verifica_role_de_usuario = (req, res, next) => {

    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).send({
            of: false,
            err: {
                message: 'Unhautorized'
            }
        })
    }
}

module.exports = {
    validarToken,
    verifica_role_de_usuario
}