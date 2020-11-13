const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  genre: { type: Array, required: true }

}, { timestamps: true })

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
