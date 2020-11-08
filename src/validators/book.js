const yup = require('yup')

exports.bookSchema = yup
  .object()
  .shape({
    title: yup.string().required('Título é obrigatório'),
    author: yup.string().required('Autor(a) é obrigatório'),
    isbn: yup.string().required('O ISBN é obrigatório'),
    genre: yup.array().min(1).required('Esse campo é obrigatório')
  })
  .required('O formulário não pode ser vazio')
