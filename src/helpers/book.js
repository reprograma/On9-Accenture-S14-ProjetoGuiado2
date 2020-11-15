const BookAvailable = require('../models/BookAvailable')

exports.createAvailableBookEntry = async (book, userId) => {
    const newAvailableBook = new BookAvailable({
        bookId: book.id,
        userId: user.id
    })

    try {
        return await newAvailableBook.save()
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}