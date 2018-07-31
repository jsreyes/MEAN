'use strict'

//Modulo de express
var express = require('express');
var UserController = require('../controllers/user');

//Router de express, permite crear rutas
var api = express.Router();

//Crea variable con el Middleware
var md_auth = require('../middlewares/authenticated');

//Permite trabajar con ficheros
var multipart = require('connect-multiparty');
//Para subir avatares de los users
var md_upload = multipart({ uploadDir: './uploads/users'})

api.get('/probando-controllador',  md_auth.ensureAuth, UserController.pruebas);

//Registra el usuario
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

//Actualiza el User
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);

//Ruta para subir image
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
//Obtiene la image de acuerdo a su nombre y extensión
api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;