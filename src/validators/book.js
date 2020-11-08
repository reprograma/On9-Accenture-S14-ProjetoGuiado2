const yup = require('yup')

exports.bookSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  author: yup.string().required('Autor é obrigatório'),
  isbn: yup.string().required('ISBN é obrigatório'),
  genre: yup.string().min(1).required('Autor é obrigatório')
}).required('O formulário não pode ser vazio')
