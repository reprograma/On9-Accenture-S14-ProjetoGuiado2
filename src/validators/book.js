const yup = require('yup')

exports.bookSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  author: yup.string().required('Autor (a) é obrigatório'),
  isbn: yup.string().required('O campo ISBN é obrigatório'),
  genre: yup.array().min(1).required('Esse campo é obrigatório'),
  userId: yup.string().min(24).required("O id do usuário é obrigatório")
}).required('O formulário não pode ser vazio')
