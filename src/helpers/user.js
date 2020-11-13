const bcrypt = require('bcrypt')

exports.hashPassword = async (password, res) => {
  try {
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      error: ['Aconteceu algo que nao deu para salvar a senha']

    })
  }
}
