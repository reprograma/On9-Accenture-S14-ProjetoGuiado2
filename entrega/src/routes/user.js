const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

//@route POST api/users/signup
//@desc Cadastrando um usuário
//@acess Public

router.post('/signup', userController.signup)

//@route POST api/users/all
//@desc Buscando todos os usuários cadastrados
//@acess Public

router.get('/all', userController.showAllUsers)




module.exports =   router
