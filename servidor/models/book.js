'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = Schema({    
    title: String,
    author: String,
    ISBN: String,
    pages: String,
    dateP: {type:Date},
    date: { type: Date, default: Date.now}    
});

module.exports = mongoose.model('Book', BookSchema);
// books --> guarda documentos de este tipo y con esta estructura dentro de esta colección