const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

//@route POST /api/books/available/new
//@desc Adicionando nova entrada de livros disponível
//@access Public
router.post('/available/new', bookController.addAvailableBook)

//@route GET /api/books/available/all
//@desc Trazendo todos os livros cadastrados
//@access Public
router.get('/available/all', bookController.showAllBooks)

//@route GET /api/books/available/user/:id
//@desc Mostra todos os livros disponíveis pelo ID do usuário
//@access Public
router.get('/available/user/:id', bookController.getAvailableBooksFromUser)

module.exports = router