const { BookSchema } = require('../validators/book')
const Book = require('../models/Book')
const BookAvailable = require('../models/BookAvailable')
const { createAvailableBookEntry } = require('../helpers/book')


exports.getAvailableBooksFromUser = async (req, res) => {
  const booksList = await BookAvailable.find({ userId: req.params.id })
  if (booksList.length > 0) {
    return res.status(200).json({ message: `A lista de livros pelo ID é:`, booksList })
  } else {
    res.status(204).json({ message: `O usuário informado não disponibilizou nenhum livro.` })
  }
}


exports.addAvailableBook = async (req, res) => {
  try {
    // 1 - Checar se o corpo da requisição é válido
    const validatedBook = await BookSchema.validate(req.body)
    console.log(validatedBook)

    // 2 - Buscar a partir do ISBN se esse livro já existe no nosso banco
    Book.findOne({ isbn: validatedBook.isbn })
      .then(async existingBook => {
        let newBook

        // 3- Caso esse livro não esteja no nosso banco, criar ele na coleção Books e salvar
        if (!existingBook) {
          newBook = new Book(validatedBook)
          newBook.save()
            .then((result) => { res.status(200).json(result) })
            .catch(e => {
              console.log(e)
              // Retornando a nossa função mais cedo caso haja um erro ao salvar o livro
              return res.status(303).json({ errors: ['Não é possível criar na table livro'] })
            })
        }

        // OBS: Se o livro passado pela requisição já existir no banco de dados, mandamos ele (existingBook), se não, mandamos o newBook
        // 4 - Criando uma nova entrada de livro disponível na coleção BookAvailable através do helper createAvailableBookEntry
        createAvailableBookEntry(
          existingBook || newBook,
          validatedBook.userId
        )
          .then(bookAvailable => res.status(200).json(bookAvailable))
          .catch(e => {
            return res.status(500).json({ errors: ['Houve um erro ao criar uma entrada na tabela BookAvailable'], e })
          })
      })

  } catch (e) {
    // Retornando erro de validação
    console.log({ e })
    return res.status(200).json(e)
  }
}