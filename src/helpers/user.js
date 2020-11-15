const bcrypt = require('bcrypt')

exports.hashPassword = async (password, res) => {
    try {
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (e) {
        console.log(e)
        return res.status(500).json({errors: ['Aconteceu algo de errado ao salvar a senha']})
    }
}
