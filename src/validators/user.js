const yup = require('yup') // importando o yup

// Personalizando mensagens de erro
yup.setLocale({
  string: {
    email: 'Esse email não é válido',
    min: 'A senha precisa ter no mínimo 8 caracteres'
  }
})

// declarando qual validação queremos no projeto
exports.signupSchema = yup.object().shape({ // esse objeto vai ter esse formato(shape)
  email: yup.string().email('Esse campo é obrigatório'),
  password: yup.string().min(8).required('Esse campo é obrigatório'), // senha é uma string, minimo 8 caracteres e é obrigatória
  address: yup.string().required('Esse campo é obrigatório')
}).required('Esse objeto não pode ser vazio')
