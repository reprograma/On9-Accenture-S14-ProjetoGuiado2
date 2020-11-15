const User = require('../models/User')
const { signupSchema } = require('../validators/user')
const { hashPassword } = require('../helpers/user')
const { object } = require('yup')

/*~ Retornar todos os usuários cadastrados ~*/
exports.getAll = (req, res) => {
  User.find()
  .then(users){
    if(Object.keys(User).length > 0){
      return res.status(200).json(users)
    }
    }else{
      return res.status(204).json({message: "Ainda não há usuários registrados!"})
  }
  .catch(e){
    return res.status(400).json({
      error: e,
      message: "Ops! Ocorreu algum problema, tente novamente!"
    })
  }
}

/*~ Cadastrar um novo usuário ~*/
exports.signup = async (req, res) => {
  try {
    const validatedBody = await signupSchema.validate(req.body)
    const user = new User(validatedBody)

    User.findOne({ email: validatedBody.email })
      .then(async existingUser => {        
        if (existingUser) {
          return res.status(400).json({
            errors: ['Já existe uma conta com esse e-mail']
          })
        }
                /*~ Criptografia de senha ~*/
        const passwordHashed = await hashPassword(user.password, res)

        user.password = passwordHashed

        user.save()
          .then(user => res.status(200).json(user))
          .catch(err => {
            console.log(err)
            return res.status(500).json(err)
          })
      })
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}
