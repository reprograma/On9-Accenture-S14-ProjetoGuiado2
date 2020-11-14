const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

router.post('/available/new', bookController.addAvailableBook)
router.get('/books/available', bookController.searchForAvailableBooks)

module.exports = router
