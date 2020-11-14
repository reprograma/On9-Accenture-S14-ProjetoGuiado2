const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// @route POST api/users/signup
// @desc Registrar usuário
// @access Public
router.post('/signup', userController.signup)

// @route GET api/users/signup/all
// @desc Mostrar todos os usuários cadastrados
// @access Public
router.get('/all', userController.getAll)

module.exports = router
