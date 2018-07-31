'use strict'

var fs = require('fs');//Trabajar con files
var path = require('path');//Ruta de esos files
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res){
    res.status(200).send({
        message: 'Probando una acción del controlador User.js'
    })
}

//Método para crear usuario
function saveUser(req, res){
    var user = new User();

    var params = req.body;

    console.log(params);

    //Saca del request los datos y los asigna al modelo de User
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';


    if(params.password){
        //ENcriptar contraseña y guardar datos
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;

            //Comprueba si el surname e email tengan info
            if(user.name != null && user.surname != null && user.email != null){
                //Guarda usuario
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({ message: 'Error al guardar el usuario' })
                    }else{
                        if(!userStored){
                            res.status(404).send({ message: 'No se ha registrado el usuario' })
                        } else {
                            //Devuelve el objeto con lo guardado en la BD
                            res.status(200).send({ user: userStored })
                        }
                    }
                });
            }else {
                res.status(200).send({ message: 'Rellena todos los campos' })
            }
        })
    } else {
        res.status(500).send({ message: 'Introduce la contraseña' })
    }
}

//Método para login
function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    //Utilizando ORM para hacer find
    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no existe'});
            }else{

                //Comprobar la contraseña
                bcrypt.compare(password, user.password, function(err, check){
                    if(check){
                        //Devolver los datos de usuario logueado
                        if(params.gethash){
                            //Devolver un token de JWT
                            res.status(200).send({
                                token: jwt.createToken(user)//Genera el token para el usuario
                            })                        
                        }else{
                            res.status(200).send({user});
                        }
                    } else {
                        res.status(404).send({message: 'El usuario no podido loguearse'});

                    }
                })

            }
        }
    })
};

//Función Update para actualizar usuario
function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    console.log()
    //Busca el usuario de acuerdo a su ID//La version de mongoose 4 o superior toca agregarle un tercer parametro
    User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
        if(err){
           // console.log(err, ' este es el error');
            console.log(userUpdated, ' cuerpo a actualizar');

            res.status(500).send({message: 'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                // Si no existe 
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            }else {
                res.status(200).send({user: userUpdated});
            }

        }
    });
};

//Función para cargar image de usuario
function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'No subido';

    //
    if(req.files){

        var file_path = req.files.image.path;

        //Para cortar el string para saber el nombre
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        //Obtiene la extension
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        console.log(ext_split);

        if(file_ext == 'png' || file_ext =='jpg' || file_ext =='gif'){

            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
                
                if(!userUpdated){
                    // Si no existe 
                    res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                }else {
                    res.status(200).send({user: userUpdated});
                }
            });
        }else{
            res.status(200).send({message: 'Extensión del archivo no valida'});
        }

    }else{
        res.status(200).send({message: 'No has subido ninguna imagen...'});
    }
};

//
function getImageFile(req, res){

    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;

    //Ccomprueba si existe en el servidor
    fs.exists(path_file, function(exists){
        if(exists){
            //Si existe nos envia un fichero, devuelve la imagen
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen...'});
        }
    })
}


//Exporta el controlador
module.exports = {
    pruebas,
    saveUser, 
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};