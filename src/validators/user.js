const yup = require('yup')

// Personalizando mensagens de erro
yup.setLocale({
  string: {
    email: 'Esse e-mail não é válido',
    min: 'A senha precisa ter no mínimo 8 caracteres'
  }
})

// declaramos que  esperamos  que esse yup venha como objeto e tenha uma determinada forma(shape) que vamos determinar
exports.signupSchema = yup.object().shape({
  email: yup.string().email().required('Esse campo é obrigatório'),
  password: yup.string().min(8).required('Esse campo é obrigatório'),
  address: yup.string().required('Esse campo é obrigatório')
}).required('Esse objeto não pode ser vazio')
