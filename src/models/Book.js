const mongoose = require('mongoose')
const Book = require('../models/Book')
const User = require('../models/User')

const bookAvailableSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true},
    isAvailable: { type: Boolean, required: true, default: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const BookAvailable = mongoose.model('BookAvailable', bookAvailableSchema)

module.exports = BookAvailable