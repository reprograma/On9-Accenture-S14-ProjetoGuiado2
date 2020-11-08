const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// @route POST api/users/signup
// @desc Registrar usuário
// @access Public
router.post('/signup', userController.signup)// http://localhost:5000/api/users/signup id 5fa84652d0010e63b49873a4

module.exports = router
