'use strict'

var express = require('express');
var BookController = require('../controllers/book');

var router = express.Router();

// Rutas útiles
router.post('/save', BookController.save);
router.get('/books', BookController.getBooks);
router.get('/book/:id', BookController.getBook);
router.put('/book/:id', BookController.update);
router.delete('/book/:id', BookController.delete);
router.get('/search/:search', BookController.search);

module.exports = router;