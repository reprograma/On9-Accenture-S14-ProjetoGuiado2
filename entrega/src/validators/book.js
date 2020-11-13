const yup = require('yup')

exports.BookSchema = yup.object().shape({
    title: yup.string().required('título é um campo obrigatório'),
    author: yup.string().required('O autor é obrigatório'),
    isbn: yup.string().required('O campo ISBN é obrigatório'),
    genre: yup.array().min(1).required('Esse campo  é obrigatório')
}).required('O formulário não pode ser vazio')