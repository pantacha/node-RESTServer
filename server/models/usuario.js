const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let roles = { values: ['USER_ROLE', 'ADMIN_ROLE'], message: '{VALUE} no es un rolex valido' };

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'the name is required']
    },
    email: {
        type: String,
        required: [true, 'the email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'the password is required']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

/*usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}*/

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debera ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);