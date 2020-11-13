const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// @route GET api/users/signup
// @desc buscar todos os usuário
// @access Public
router.get('/all', userController.allUsers)

// @route POST api/users/signup
// @desc Registrar usuário
// @access Public
router.post('/signup', userController.signup)

module.exports = router
