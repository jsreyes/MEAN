'use strict'

var express = require('express');
var bodyParser = require('body-parser');

//Objeto de express
var app = express();

//Cargar Rutas
var user_routes = require('./routes/user')


//Configuración bodyParser 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //Convierte a objeto JSON

//Configurar cabeceras Http


//Rutas Base
app.use('/api', user_routes);


//Para utilizar express dentro de otros ficheros que incluyan app
module.exports = app;