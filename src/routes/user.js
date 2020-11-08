const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// @route POST api/users/signup
// @desc Registrar usuário
// @access Public
router.post('/signup', userController.signup)
