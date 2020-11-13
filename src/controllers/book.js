const { bookSchema } = require('../validators/book')
// const bookModel = require('../models/Book')
// const bookAvailable = require('../models/BookAvailable')
// const { createAvailableBookEntry } = require('../helpers/book')
const Book = require('../models/Book')

exports.addAvailableBook = async (req, res) => {
  try {
    const validatedBook = await bookSchema.validate(req.body)
    const book = new Book(validatedBook)

    Book.findOne({ bookId: validatedBook.bookId })
      .then(async existingBook => {
        if (existingBook) {
          return res.status(400).json({
            errors: ['Já existe um livro com esse ID']
          })
        }

        book.save()
          .then((result) => res.status(200).json(result))
          .catch(err => {
            console.log(err)
            return res.status(303).json(err)
          })
      })
  } catch (err) {
    console.log(err)
  }
}
