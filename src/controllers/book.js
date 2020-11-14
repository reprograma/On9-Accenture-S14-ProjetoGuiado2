const { bookSchema } = require('..validators/book');
const BookAvailable = require('../models/BookAvailable');
const User = require('../models/User')
const { signupSchema } = require('../validators/user')
const { hashPassword } = require('../helpers/user')

//
exports.searchForAvailableBooks = async () => {
    const booksAvailable = await BookAvailable.find({ isAvailable: true });
    return booksAvailable;

    BookAvailable.find(booksAvailable)
    .then((res) => {
        response.status(200).json(res);
        })
    .catch(err => next(err));}
  

  exports.addAvailableBook = (req, res) => {

  }
