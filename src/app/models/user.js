const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs'); 
const passport = require('passport');

const userSchema = new mongoose.Schema({        //para registrarse de diferentes formas
    local: {
        email: String,
        password: String
    },
    facebook: {
        email:String,
        password: String,
        id: String,
        token: String
    },
    twitter: {
        email:String,
        password: String,
        id: String,
        token: String
    },
    google: {
        email:String,
        password: String,
        id: String,
        token: String
    }
});

userSchema.methods.generateHash = function (password){                         //cifra la password 
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);            //genSalt es para ver cuantas veces se aplica el algoritmo
};

userSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password, this.local.password);               //para comparar dos contraseñas
}

module.exports = mongoose.model('User', userSchema);
