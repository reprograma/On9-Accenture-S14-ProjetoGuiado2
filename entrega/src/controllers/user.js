const User = require('../models/User')
const signupSchema = require('../validators/user')
const { hashPassword } = require('../helpers/user')

exports.signup = async (request, response) => {
	try {
		//validação do corpo do usuário
		const validatedBody = await signupSchema.validate(request.body)

		//criando o nosso usuario com o Model User
		const user = new User(validatedBody);

		//verificando sej já existe algum usuário com esse email
		User.findOne({ email: validatedBody.email })
			.then(async result => {
				if (result) {
					return response.status(400).json({ errors: [`Já existe uma conta com esse e-mail`] })
				}

				const passwordHashed = await hashPassword(user.password, response)
				user.password = passwordHashed

				user.save()
					.then(user => response.status(200).json({message:`Usuário cadastrado com sucesso`,user}))
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

exports.showAllUsers = (request, response) => {
	User.find()
		.then((users) => { response.status(200).json(users) })
		.catch(err => { response.status(400).json({errors:`Infelizmente, não foi possível mostrar todos os usuários cadastrados`, err})})
}


// bcrypt.genSalt(10)
// 					.then(salt => {
// 						//hasheando a senha
// 						bcrypt.hash(user.password, salt)

// 							.then(hash => {
// 								//Substituindo as senhas
// 								user.password = hash
// 								user.save()
// 									.then(user => response.status(200).json(user))
// 									.catch(err => {
// 										console.log(err)
// 										return response.status(500).json(err)
// 									})
// 							})
// 							.catch(err => {
// 								console.log(err)
// 								return response.status(500).json(err)
// 							})
// 					})
// 					.catch(err => {
// 						console.log(err)
// 						response.status(500).json(err)
// 					})