const { bookSchema } = require('../validators/book')
const { createAvailableBookEntry } = require('../helpers/book')
const Book = require('../models/Book')
const BookAvailable = require('../models/BookAvailable')

exports.getAvailableBooksFromUser = (req, res) => {
    const {userId} = req.params
    BookAvailable.findById(userId)
        .then((book)=>{
        res.status(200).json(book)
        })
        .catch((e)=>{
        res.status(500).json(e)({errors: ['Livro não disponibilizado pelo Usuário']})
    })

}


exports.addAvailableBook = async (req, res) => {
    try {
        const validatedBook = await bookSchema.validate(req.body)
        return Book.findOne({ isbn: validatedBook.isbn })
        .then((availableBook) => {
            let newBook
            if(!availableBook)
            
            newBook = new Book(validatedBook)
            newBook.save()

        .catch((e) => {
        return res.stats(303).json({ errors: ['Houve um erro ao criar uma entrada na tabela'] })
        })
    

            createAvailableBookEntry(
            availableBook || newBook,
            validatedBook.userId,
        )
    })
        .then(bookAvailable => res.status(200).json(bookAvailable))
        .catch((e) => {
            return res.status(500).json({ errors: ['Houve um erro ao criar uma entrada na tabela'] })
            })
        

    } catch (e) {
        return res.status(200).json(e)
    }
}
