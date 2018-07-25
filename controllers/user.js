'use strict'

function pruebas(req, res){
    res.status(200).send({
        message: 'Probando una acción del controlador User.js'
    })
}

//Exporta el controlador
module.exports = {
    pruebas
};