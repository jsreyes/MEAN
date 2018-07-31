'use strict'

var express = require('express');
var bodyParser = require('body-parser');

//Objeto de express
var app = express();

//Cargar Rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
//var artist_routes = require('./routes/artist');
//var artist_routes = require('./routes/artist');



//Configuración bodyParser 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //Convierte a objeto JSON

//Configurar cabeceras Http


//Rutas Base
app.use('/api', user_routes);
app.use('/api', artist_routes);
//app.use('/api', album_routes);
//app.use('/api', song_routes);




//Para utilizar express dentro de otros ficheros que incluyan app
module.exports = app;