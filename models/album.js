'use strict'

var mongoose = require('mongoose');
//Permite definir un modelo o esquema de BD
var Schema = mongoose.Schema;


var AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: { type: Schema.ObjectId, ref: 'Artist'}
});


module.exports = mongoose.model('Album', AlbumSchema);
