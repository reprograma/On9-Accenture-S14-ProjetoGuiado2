const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true }, // required pq é campo obrigatório e o unique pq é unico, só pode ter um email daquele
  password: { type: String, required: true },
  address: { type: String, required: true }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User
