const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

const { validarToken, verifica_role_de_usuario } = require('../middlewares/authentication');


app.get('/usuario', validarToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite;
    limite = Number(limite);
    Usuario.find({ estado: true }, 'nombre email role estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuariosFound) => {
            if (err) res.status(400).send({
                ok: false,
                err
            })
            Usuario.count({ estado: true }, (err, contador) => {
                res.status(200).send({
                    ok: true,
                    usuario: usuariosFound,
                    contador
                })
            })
        })
        /*    
        let user = {
            name: 'Piko',
            username: 'Vena'
        }
        res.status(200).send({
            user: user,
            message: 'Usuario encontrado'
        });*/

})

app.post('/usuario', [validarToken, verifica_role_de_usuario], (req, res) => {
    let usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.password = bcrypt.hashSync(req.body.password, 10);
    usuario.role = req.body.role;

    usuario.save((err, usuarioSaved) => {
        if (err) res.status(400).send({
            ok: false,
            err
        })
        res.json({
            ok: true,
            usuario: usuarioSaved
        })
    })

})

app.put('/usuario/:id', [validarToken, verifica_role_de_usuario], (req, res) => {
    let id = req.params.id;
    let update = _.pick(req.body, ['nombre', 'email', 'estado', 'role', 'password']);

    Usuario.findByIdAndUpdate(id, update, { runValidators: true }, (err, usuarioUpdate) => {
        if (err) res.status(400).send({
            ok: false,
            err
        })
        res.status(200).send({
            ok: true,
            usuario: usuarioUpdate
        })
    })

})

app.delete('/usuario/:id', [validarToken, verifica_role_de_usuario], (req, res) => {
    let id = req.params.id;
    let usuario_borrado_del_registro = { estado: false };

    Usuario.findByIdAndUpdate(id, usuario_borrado_del_registro, { new: true }, (err, usuarioBorrado) => {
        if (err) res.status(400).send({ ok: false, err });
        if (!usuarioBorrado) res.status(404).send({ ok: false, err: { message: 'usuario no encontrado' } });

        res.status(200).send({ ok: true, usuario: usuarioBorrado });
    })

    /*Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) res.status(400).send({ ok: false, err });
        if (!usuarioBorrado) res.status(404).send({ ok: false, err: { message: 'usuario no encontrado' } });

        res.status(200).send({ ok: true, usuario: usuarioBorrado });
    })*/
})

module.exports = app;