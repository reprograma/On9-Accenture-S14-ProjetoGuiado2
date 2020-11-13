const User = require('../models/User')
const { signupSchema } = require('../validators/user')
const { hashPassword } = require('../helpers/user')

// POST usuário
exports.signup = async (req, res) => {
  // Lógica de salvar usuários no nosso banco
  // Recebemos pelo req.body, os valores para popular o nosso banco com um Usuário novo
  try {
    // 1- Validação do corpo do usuário
    const validatedBody = await signupSchema.validate(req.body)

    // 2- Criar o nosso usuário com o Model User
    const user = new User(validatedBody)

    // 3 - Procuramos se existe algum usuário no banco com esse e-mail
    User.findOne({ email: validatedBody.email })
      .then(async existingUser => {
        // 4 - Verificar se existe algum usuário com esse e-mail
        if (existingUser) {
          // Se existir, retornamos um erro
          return res.status(400).json({
            errors: ['Já existe uma conta com esse e-mail']
          })
        }

        // 5- Criptografar a senha inserida pelo usuário
        // hashPassword é um Promise, e para ser guardado dentro de uma variável, precisamos do await
        const passwordHashed = await hashPassword(user.password, res)

        // 6- Substituir a nossa senha vinda da requisição com a senha criptografada
        user.password = passwordHashed

        // 7 - Salvar no banco
        user.save()
          // 8 - Caso a requisição seja bem sucedida, retornar o usuário criado com status 200
          .then(user => res.status(200).json(user))
          // 9 - Caso a requisição não seja bem sucedida, retornar status 500 com o erro
          .catch(err => {
            console.log(err)
            return res.status(500).json(err)
          })
      })
  } catch (e) {
    console.log(e)
  }
}

// GET retornar todos os usuários cadastrados
exports.allUsers = async (req, res) => {
  User.find({})
    .then((user) => res.status(200).json(user))
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
}
