const bcrypt = require("bcrypt");

exports.hashPassword = async (password, res) => {
  try {
    // Salt/salteador de senha
    // Adc mais um nível de aleatoriedade para que as senhas critografadas nunca tenha o mesmo valor
    const salt = await bcrypt.genSalt(10);

    // Hashear a senha (extra segurança)
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errors: ["Aconteceu algo de errado ao salvar a senha"],
    });
  }
};
