const Book = require('../models/Book')
const helper = require('../helpers/book')
const { bookSchema } = require('../validators/book')

exports.addAvailableBook = async (req, res) => {
  try {
    const validatedBook = await bookSchema.validate(req.body)

    Book.findOne({ isbn: validatedBook.isbn })
      .then(async existingBook => {
        let newBook
        // 3- Caso esse livro não esteja no nosso banco, criar ele na coleção Books e salvar
        if (!existingBook) {
          // Criando um novo livro
          newBook = new Book(validatedBook)
          // Salvando
          newBook.save()
            .then(book => res.status(200).json(book))
            .catch(e => {
              console.log(e)
              // Retornando a nossa função mais cedo caso haja um erro ao salvar o livro
              return res.status(404).json({ errors: ['Houve um erro ao criar uma entrada na tabela books'] })
            })
        }

        // OBS: Se o livro passado pela requisição já existir no banco de dados, mandamos ele (existingBook), se não, mandamos o newBook
        // 4 - Criando uma nova entrada de livro disponível na coleção BookAvailable através do helper createAvailableBookEntry
        helper.createAvailableBookEntry(
          existingBook || newBook,
          validatedBook.userId
        )
          .then(bookAvailable => res.status(200).json(bookAvailable))
          .catch(e => {
            return res.status(404).json({ errors: ['Houve um erro ao criar uma entrada na tabela BookAvailable'] })
          })
      })
  } catch (e) {
    // Retornando erro de validação
    console.log({ e })
    return res.status(500).json(e)
  }
}
