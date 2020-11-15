const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
email: { type: String, unique: true, required: true },
password: { type: String, required: true },
address: { type: String, required: true }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User

/* Clicar em "Tamanho da Tab" ou "Tab Size" ali no rodapé do VSCode

CLicar em "Indent using Tabs" e depois selecionar 2 */
