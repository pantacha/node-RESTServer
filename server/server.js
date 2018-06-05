require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Configuracion Global de rutas
app.use(require('./routes/index'));


mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) {
        console.log('Error');
    } else {
        console.log('Base de datos ONLINE');
    }
});

app.listen(process.env.PORT, () => { console.log(`Server escuchando en el puerto ${process.env.PORT}`) });

console.log(process);