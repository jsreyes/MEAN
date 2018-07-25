'use strict'

// Cargamos la librería o módulo
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977; //Puerto servidor Web

//Para quitar los mensajes de Mongoose en Terminal
mongoose.Promise = global.Promise;

//Conectar con DB
mongoose.connect('mongodb://localhost:27017/curso_mean2', { useNewUrlParser: true }, (err, res) => {
    //Por si la conexion no se puede hacer
    if(err){
        throw err;
    } else {
        console.log('La Bd esta corriendo al pelo');

        app.listen(port, function(){
            console.log("Servidor de API escuchando en http://localhost:" + port);
        })
    }
})