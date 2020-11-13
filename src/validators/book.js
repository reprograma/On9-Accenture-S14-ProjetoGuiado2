const yup = require('yup')

// Declarando qual a validação que queremos no nosso objeto
exports.bookSchema = yup.object().shape({
  title: yup.string().required('Titulo obrigatório'),
  author: yup.string().required('Autor obrigatório'),
  isbn: yup.string().required('Esse campo ISBN é obrigatório'),
  genre: yup.Array().min(1).required('Esse campo é obrigatório')
}).required('Esse formulário não pode ser vazio')
