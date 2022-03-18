'use strict'

var validator = require('validator');
var fs = require('fs'); // Modulo file system
var path = require('path'); // Modulo path

var Book = require('../models/book');
const { exists } = require('../models/book');

var controller = {

    datosCurso : (req, res) => {
        return res.status(200).send({
            Curso: 'ApliWeb 2022',
            Autor: 'Jaime Esteban',            
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de libros'
        });
    },  

    // Metodo para Guardar libros
    save: (req, res) => {
        //Recoger los parametros por post
        var params = req.body;
        
        // Validar datos (validator)                    
        try{
            var validate_title = !validator.isEmpty(params.title); // va a dar true cuando no este vacio
            var validate_author = !validator.isEmpty(params.author);
            var validate_ISBN = !validator.isEmpty(params.ISBN);
            var validate_pages = !validator.isEmpty(params.pages);
            var validate_dateP = !validator.isEmpty(params.dateP);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if(validate_title && validate_author && validate_ISBN && validate_pages && validate_dateP){

            // Crear el objeto a guardar
            var book = new Book();

            // Asignar valores
            book.title = params.title;
            book.author = params.author;
            book.ISBN = params.ISBN;
            book.pages = params.pages;
            book.dateP = params.dateP;
            book.image = null;

            // Guardar el articulo
            book.save((err, bookStored) =>{
                if(err || !bookStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El libro no se a guardado'
                    }); 
                }
                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    article: bookStored
                });
            });

        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos !!!'
            });
        }        
    },

    // Metodo para enviar todoslibros
    getBooks: (req, res) => {
        
        var query = Book.find({})

        // Find
        query.sort('-_id').exec((err, books) =>{
        
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los libros !!!'
                });
            } 

            if(!books){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay libros para mostrar !!!'
                });
            }
            return res.status(200).send({
                status: 'success',
                books
            });
        });       
    },

    // Metodo para devolver un libro por medio del id
    getBook: (req, res) => {

        // Recoger el id de la url
        var bookId = req.params.id;

        // Comprobar que existe
        if(!bookId || bookId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo !!!'
            });
        }

        // Buscar el articulo
        Book.findById(bookId, (err, book) => {
            
            if(err || !book){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el libro !!!'
                });
            }

            // Devolver en json
            return res.status(200).send({
                status: 'success',
                book
            });
        });       
    },

    // Metodo para actualizar datos
    update: (req, res) => {

        // Recoger el id del libro por la url
        var bookId = req.params.id;

        // Recoger los datos que llagan por el put
        var params = req.body;

        // Validar datos
        try{
            var validate_title = !validator.isEmpty(params.title); 
            var validate_author = !validator.isEmpty(params.author);
            var validate_ISBN = !validator.isEmpty(params.ISBN);
            var validate_pages = !validator.isEmpty(params.pages);
            var validate_dateP = !validator.isEmpty(params.dateP);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!'
            });
        }
        if( validate_title && validate_author && validate_ISBN && validate_pages && validate_dateP){
            // Find and update
            Book.findOneAndUpdate({_id:bookId}, params, {new:true}, (err, bookUpdate) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    }); 
                }

                if(!bookUpdate){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el libro !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    book: bookUpdate
                });
            });
        }else{
            // Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'la validación no es correcta !!!'
            });
        }       
    },

    // Metodo para eliminar un articulo
    delete: (req, res) => {
        // Recoger el id de la url
        var bookId = req.params.id;

        // Find and delete
        Book.findOneAndDelete({_id: bookId}, (err, bookRemoved) =>{
            if(err ){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!bookRemoved ){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error o No existe el artculo !!!'
                });
            }
            
            return res.status(200).send({
                status: 'success',
                article: bookRemoved
            });
        });       
    }, 

    //Acción para buscar libros en la API REST(buscador NodeJS)
    search:(req, res) => {
        // Sacar el string a buscar
        var searchString = req.params.search;

        // find or  //SI el searchString esta contenido en los datos entonces saca los libros que coincidan 
        Book.find({ "$or": [
            {"title": {"$regex": searchString, "$options": "i"}},
            {"author": {"$regex": searchString, "$options": "i"}},
            {"ISBN": {"$regex": searchString, "$options": "i"}},
            {"pages": {"$regex": searchString, "$options": "i"}},
            {"dateP": {"$regex": searchString, "$options": "i"}}
        ]})
        .sort([['date','descending']]) //ordena por fecha y de manera desendente

        // exec ejecuta la query y saca los datos de la Base de Datos
        .exec((err, books) => {     
            if(err){
                return res.status(500).send({ 
                    status: 'error',
                    message: 'error en la petición !!!'
                });
            }

            if(!books || books.length <= 0){
                return res.status(404).send({ 
                    status: 'error',
                    message: 'No hay libros que coincidan !!!'
                });
            }
            return res.status(200).send({ 
                status: 'success',
                books
            });
        });        
    }

}; // end controller

module.exports = controller;