const { bookSchema } = require('../validators/book')
const Book = require('../models/Book')
const BookAvailable = require('../models/BookAvailable')
const { createAvailableBookEntry } = require('../helpers/book')

// exports.getAvailableBooksFromUser = (req, res) => {
//   // 1- Buscar todos os livros que o usuário disponibilizou (BookAvailable)
//   // Usar o id do usuário passado nos parâmetros para buscar todos os BookAvailable relacionados a esse userId
//   // 2- Lidar com uma resposta bem sucedida da busca
//     // 2.1- Mandar alguma resposta formatada com status 204 caso não exista nenhum nenhum livro que o usuário disponibilizou
//     // 2.2- Responder com status 200 e as entradas dos livros disponibilizados pelo usuário
//   // 3- Lidar com uma resposta mal sucedida da busca
// }

exports.addAvailableBook = async (req, res) => {
  try {
    // 1 - Checar se o corpo da requisição é válido
    // Obs.: Todo async precisa de um await
    const validatedBook = await bookSchema.validate(req.body)

    // 2 - Buscar a partir do ISBN se esse livro já existe no nosso banco
    return Book.findOne({ isbn: validatedBook.isbn }).then(
      async (existingBook) => {
        let newBook
        // 3- Caso esse livro não esteja no nosso banco, criar ele na coleção Books e salvar
        if (!existingBook) {
          // Criando um novo livro
          newBook = new Book(validatedBook)
          // Salvando
          newBook.save().catch((e) => {
            console.log(e)
            // Retornando a nossa função mais cedo caso haja um erro ao salvar o livro
            return res.status(303).json({ errors: ['Houve um erro ao criar uma entrada na tabela Users'] })
          })
        }

        // OBS: Se o livro passado pela requisição já existir no banco de dados, mandamos ele (existingBook), se não, mandamos o newBook
        // 4 - Criando uma nova entrada de livro disponível na coleção BookAvailable através do helper createAvailableBookEntry
        createAvailableBookEntry(existingBook || newBook, validatedBook.userId)
          .then(bookAvailable => {
            return res.status(201).json(bookAvailable)
          })
          .catch((e) => {
            return res.status(500).json({ errors: ['Houve um erro ao criar uma entrada na tabela BookAvailable'] })
          })
      }
    )
  } catch (e) {
    // Retornando erro de validação
    console.log({ e })
    return res.status(200).json(e)
  }
}

exports.getAll = async (req, res) => {
  try {
    Book.find({})
      .exec()
      .then(async (books) => {
        const status = books && books.length > 0 ? 200 : 204

        return res.status(status).send(books)
      })
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}

exports.getAllByUser = async (req, res) => {
  try {
    const userId = req.params.id

    BookAvailable.find({ userId: userId })
      .populate('bookId', ['title', 'genre', 'author', 'isbn'])
      .then(async (books) => {
        const status = books && books.length > 0 ? 200 : 204

        return res.status(status).send(books)
      })
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}
