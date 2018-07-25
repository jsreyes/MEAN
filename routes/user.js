'use strict'

//Modulo de express
var express = require('express');
var UserController = require('../controllers/user');

//Router de express, permite crear rutas
var api = express.Router();

api.get('/probando-controllador', UserController.pruebas);

module.exports = api;