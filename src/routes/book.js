const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

// @route POST api/books/available/new
// @desc Adicionar nova entrada de livro disponível
// Esse endpoint não deveria ser público, porém como não possuimos autenticação, não consegue ser privado
// @access Public

router.post('/available/new', bookController.addAvailableBook)

module.exports = router
