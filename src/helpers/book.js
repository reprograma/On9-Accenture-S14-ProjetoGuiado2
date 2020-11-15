const BookAvailable = require('../models/BookAvailable')
exports.createAvailableBookEntry = async (book, userId) => {

  try {
    const newAvailableBook = new BookAvailable({
      bookId: book.id,
      userId: userId
    })
    console.log(newAvailableBook)
    return await newAvailableBook.save()
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
} 