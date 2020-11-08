const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.js')

// @route Post api/users/signup
// @desc Registrar usuário
// @access Public
router.post('/signup', userController.signup)
