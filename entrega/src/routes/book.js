const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

//@route POST /api/books/available/new
//@desc Adicionando nova entrada de livros disponível
//@access Public

router.post('/available/new', bookController.addAvailableBook)
router.get('/available/user/:id', bookController.getAvailableBooksFromUser)

module.exports = router