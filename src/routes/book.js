const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

// @route POST /api/books/available/new
// @desc Adicionar nova entrada de livro disponível
// Esse endpoint não deveria ser publico, mas como não possuimos autenticação, ele não consegue ser privado
// @acess Public
router.post('/available/new', bookController.addAvailableBook)

module.exports = router
