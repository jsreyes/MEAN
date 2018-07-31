'use strict'

//Modulo de express
var express = require('express');
var ArtistController = require('../controllers/artist');

//Router de express, permite crear rutas
var api = express.Router();

//Crea variable con el Middleware, de usuario correctamente logueado
var md_auth = require('../middlewares/authenticated');

//Permite trabajar con ficheros
var multipart = require('connect-multiparty');
//Para subir avatares de los users
var md_upload = multipart({ uploadDir: './uploads/users'})


//Se crean las rutas para el getArtist
api.get('/artist/:id',  md_auth.ensureAuth, ArtistController.getArtist);

//Para crear un artista
api.post('/artist',  md_auth.ensureAuth, ArtistController.saveArtist);


module.exports = api;