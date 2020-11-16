const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

// @route POST /api/books/available/new
// @desc Adicionar nova entrada de livro disponível
// Esse endpoint não deveria ser público, porém, como não possuimos autenticação, ele não consegue ser privado
// @access Public
router.post('/available/new', bookController.addAvailableBook)

// @route GET /api/books/all
router.get("/all", bookController.getAll)

// @route GET /api/books/available/user/:id
router.get("/available/user/:id", bookController.getAllByUser)

// @route GET /api/books/available/user:id
// @desc Buscar todos os livros disponibilizados pelo usuário passado nos params
// Esse endpoint não deveria ser público, porém, como não possuimos autenticação, ele não consegue ser privado
// @access Public
// router.get('/available/user/:id', bookController.getAvailableBooksFromUser)

module.exports = router
