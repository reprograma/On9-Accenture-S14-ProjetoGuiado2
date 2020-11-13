const mongoose = require('mongoose')
const Schema = mongoose.Schema

const booksAvailableSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    isAvailable: { type: Boolean, required: true, default: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

const BookAvailable = mongoose.model('BooksAvailable', booksAvailableSchema)

module.exports = BookAvailable