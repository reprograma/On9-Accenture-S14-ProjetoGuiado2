const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// @route POST api/users/singup
// @desc Registrar usuário
// @acess Public
router.post('/signup', userController.signup)

router.get('/all', userController.getAll)

// router.get('/one', userController.getById)

module.exports = router
