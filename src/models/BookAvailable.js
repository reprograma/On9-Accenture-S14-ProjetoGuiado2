const mongoose = require('mongoose')
const Schema = mongoose.Schema

const booksAvailableSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, required: true },
  isAvailable: { type: Boolean, required: true, default: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const BookAvailable = mongoose.model('BookAvailable', booksAvailableSchema)

module.exports = BookAvailable
