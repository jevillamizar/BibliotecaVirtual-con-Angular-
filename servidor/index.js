//canectamos NodeJS con MongoDB
'use strict'

var mongoose = require('mongoose');

var app = require('./app');
var port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_library', {useNewUrlParser: true})
        .then(() =>{
            console.log('conexión a la base de datos correcta!!');
        
            // Crea el servidor y escuchar peticiones HTTP
            app.listen(port, ()=> {
                console.log('servidor corriendo en http://localhost:' + port);
            })
        });