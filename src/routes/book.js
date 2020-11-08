const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

// @route POST api/books/available/new
// @desc Adicionar nova entrada de livro disponível
// Esse endpoint não deveria ser público; só deve ser acessado por um usuário logado
// Mas como não temos autenticação, ele não vai ser privado
// @access Public
router.post('/available/new', bookController.addAvailableBook)
module.exports = router
