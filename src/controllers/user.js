const User = require('../models/User')
const signupSchema = require('../validators/user')
const { hashPassword } = require('../helpers/user')

exports.signup = async (request, response) => {
  try {
    const validatedBody = await signupSchema.validate(request.body)
    const user = new User(validatedBody);

    //verifica se já existe algum usuário com o mesmo email
    User.findOne({ email: validatedBody.email })
      .then(async result => {
        if (result) {
          return response.status(400).json({ errors: [`Já existe uma conta com esse e-mail`] })
        }

        const passwordHashed = await hashPassword(user.password, response)
        user.password = passwordHashed

        user.save()
          .then(user => response.status(200).json({ message: `Usuário cadastrado com sucesso`, user }))
          .catch(err => { return response.status(500).json(err) })

      })
      .catch(err => {
        console.log(e)
        response.status(500).json(err)
      })

  }
  catch (err) {
    console.log(err)
    response.status(400).json(err)
  }

}

exports.getAll = (request, response) => {
  User.find()
    .then((users) => { response.status(200).json(users) })
    .catch(err => { response.status(400).json({ errors: ` Não foi possível mostrar os usuários cadastrados`, err }) })
}
