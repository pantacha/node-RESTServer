const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioFound) => {
        if (err) {
            return res.status(400).send({
                ok: false,
                err: {
                    message: 'Bad request'
                }
            });
        }
        if (!usuarioFound) {
            res.status(404).send({
                ok: false,
                err: {
                    message: 'Recurso no encontrado'
                }
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioFound.password)) {
            res.status(404).send({
                ok: false,
                err: {
                    message: 'Recurso no encontrado'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioFound
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.status(200).send({
            ok: true,
            usuario: usuarioFound,
            token: token
        })
    })
})


module.exports = app;