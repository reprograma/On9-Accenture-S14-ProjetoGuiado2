const yup = require('yup');

/*Por padrão, as mensagens de erro são em inglês; mas através do setLocale podemos personalizar mensagens de erro em português*/
yup.setLocale({
    string: {
        email: 'Esse e-mail não é válido'
    }
})

//Declarando qual a validação que queremos no nosso objeto
const signupSchema = yup.object().shape({ // A forma que o nosso objeto deve ter
    email: yup.string().email().required('Esse campo é obrigatório'),
    password: yup.string().min(7).required('Esse campo é obrigatório'),
    address: yup.string().required('Esse campo é obrigatório')
}).required('Esse objeto não pode ser vazio')



module.exports = signupSchema;