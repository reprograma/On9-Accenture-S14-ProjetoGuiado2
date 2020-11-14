const yup = require('yup')

exports.booksAvailableSchema = yup.object().shape({
  bookId: yup.ObjectId().required('Esse campo é obrigatório'),
  isAvailable: yup.boolean().required('Esse campo é obrigatório'),
  userId: yup.ObjectId().required('Esse campo é obrigatório')
}).required('Esse objeto não pode ser vazio')
