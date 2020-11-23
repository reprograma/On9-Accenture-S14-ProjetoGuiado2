const User = require('../models/User')
const { signupSchema } = require('../validators/user')
const { hashPassword } = require('../helpers/user')

// exports.getAll = () => {
//   // 1- Buscar todas as entradas de Usuários
//   // 2- Lidar com uma resposta bem sucedida da busca
//     // 2.1- Mandar alguma resposta formatada com status 204 caso não exista nenhum usuário cadastrado
//     // 2.2- Responder com status 200 e os usuários
//   // 3- Lidar com uma resposta mal sucedida da busca
// }

exports.signup = async (req, res) => {
  // Lógica de salvar usuários no nosso banco
  // Recebemos pelo req.body, os valores para popular o nosso banco com um Usuário novo
  try {
    // 1- Validação do corpo do usuário
    const validatedBody = await signupSchema.validate(req.body)

    // 2- Criar o nosso usuário com o Model User
    const user = new User(validatedBody)

    // 3 - Procuramos se existe algum usuário no banco com esse e-mail
    User.findOne({ email: validatedBody.email }).then(async existingUser => {
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
        .then((user) => res.status(200).json(user))
      // 9 - Caso a requisição não seja bem sucedida, retornar status 500 com o erro
        .catch((err) => {
          console.log(err)
          return res.status(500).json(err)
        })
    })
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}

exports.getAll = async (req, res) => {
  try {
    User.find({}).exec().then(async (users) => {
      const status = users && users.length > 0 ? 200 : 204

      return res.status(status).send(users)
    })
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}
