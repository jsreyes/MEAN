'use strict'

//Importamos las librería
var path = require('path');
var fs = require('fs'); //Manejador de sistema de ficheros


//Se importan los modelos a utilizar en este xontrolador
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

//Función que obtiene el artista
function getArtist(req, res){

    //Id del artista
    var artistId = req.params.Id;

    //Buscar artista por ID
    Artist.findById(artistId, (err, artist) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!artist){
                res.status(404).send({message: 'El artista no existe'});
            }else{
                res.status(200).send({artist});
            }
        }
    })
    //res.status(200).send({message: 'Metodo getArtist'});
};

//Función para crear un objeto de artista
function saveArtist(req, res){

    //Se crea el objeto Artista
    var artist = new Artist();
    console.log(artist);

    //Variable que contiene el cuerpo de la request
    var params = req.body;

    console.log(params);
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    console.log(artist);

    artist.save((err, artistStored) => {
        if(err){
            //Respuesta ante error
            res.status(500).send({message: 'Error al guardar el artista'});
        }else{
            if(!artist){
                res.status(404).send({message: 'El artista no ha sido guardado'});
            }else{
                res.status(200).send({artist: artistStored});
            }
        }
    });
};

//Exportando métodos
module.exports = {
    getArtist, 
    saveArtist
};