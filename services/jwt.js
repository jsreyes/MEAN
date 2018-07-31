'use strict'

//Se importan librerías
var jwt = require('jwt-simple');
var moment = require('moment');

//Secreto para token
var secret = 'clave_secreta_curso';

//Método para crear token
exports.createToken = function(user){
    //Datos a codificar
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        rol: user.role,
        image: user.image,
        iat: moment().unix(), //Obtiene time stamp
        exp: moment().add(30, 'days').unix()

    };

    return jwt.encode(payload, secret);
};