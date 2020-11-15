const User = require('../models/User')
const { signupSchema } = require('../validators/user')
const { hashPassword } = require('../helpers/user')

exports.getAll = (req, res) => {
    User.find()
    .then((users)=>{
        if(User.length < 0){
            res.status(204).json({message: 'Não há usuários cadastrados'})
        } else{
            res.status(200).json(users)
        }
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
},

exports.signup = async (req, res) => {
    try {
        const validatedBody = await signupSchema.validate(req.body)
        const user = new User(validatedBody)

        User.findOne({ email: validatedBody.email })
        .then(async existingUser => {
            if (existingUser) {
                return res.status(400).json({ errors: ['O email já está cadastrado em uma conta existente']})
            }
            
            const passwordHashed = await hashPassword(user.password, res)
            user.password = passwordHashed
            user.save()
            .then(user => res.status(200).json(user))
            .catch(err => {return res.status(500).json(err)
            })
        })
    } catch (e) {
    console.log(e)
    return res.status(400).json(e)
    }
}