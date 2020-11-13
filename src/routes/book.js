const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

// @route POST /api/books/available/new
// @desc Adicionar nova entrada de livro disponível
// @access Public
router.post('/available/new', bookController.addAvailableBook)

// @route POST /api/books/available/new
// @desc Adicionar nova entrada de livro disponível
// @access Public
router.get('/available/user', bookController.getAvailableBookUser)

module.exports = router
