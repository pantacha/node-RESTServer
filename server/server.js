require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));


mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw new err;
    console.log('Base de datos ONLINE');

});

app.listen(port, () => { console.log(`Server escuchando en el puerto ${port}`) });

console.log(process);