const { signupSchema } = require('../validators/user')
const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.signup = async (req, res) => {
  // Lógica de salvar usuários no nosso banco
  // Recebemos os valores para popular o banco com um usuário novo
  try {
    const validatedBody = await signupSchema.validate(req.body)
    const user = new User(validatedBody)

    User.findOne({ email: validatedBody.email }).then((existingUser) => {
      if (existingUser) {
        // existingUser pode ser 'undefined' ou retornar algum valor
        return res.status(400).json({
          errors: ['Já existe uma conta com esse e-mail']
        })
      }
      // Salt/saltear a senha
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err)
          return res.status(500).json(err)
        }

        // Hashear a senha (extra segurança)
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            console.log(err)
            return res.status(500).json(err)
          }

          // Substituir a senha vinda da req, pela senha criptografada antes de salvar no BD
          user.password = hash
          user
            .save()
            .then((user) => res.json(user))
            .catch((err) => {
              console.log(err)
              return res.status(500).json(err)
            })
        })
      })
    })
  } catch (e) {
    console.log(e)
  }
}
