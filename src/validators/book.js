const yup = require('yup')

exports.bookSchema = yup.object().shape({
  title: yup.string().required('Titulo é obrigatorio'),
  author: yup.string().required('autor é obrigatorio'),
  isbn: yup.string().required('isbn é obrigatorio'),
  genre: yup.array().min(1).required('genero é orbigatorio')
}).required('Formulario não pode ser vazio')
