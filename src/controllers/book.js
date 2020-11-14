const BookAvailable = require('../models/BookAvailable')
const Book = require('../models/Book')
const { createAvailableBookEntry } = require('../helpers/book')
const { bookSchema } = require('../validators/book')

exports.getAvailableBooksFromUser = (req, res) => {
  const { params } = req
  // 1- Buscar todos os livros que o usuário disponibilizou (BookAvailable)
  BookAvailable.findById({ userId: params.id })
//   // Usar o id do usuário passado nos parâmetros para buscar todos os BookAvailable relacionados a esse userId
//   // 2- Lidar com uma resposta bem sucedida da busca
    .then(existingBook => {
      if (!existingBook) {
        // 2.1- Mandar alguma resposta formatada com status 204 caso não exista nenhum livro que o usuário disponibilizou
        return res.status(204).json({
          errors: ['Não existe livro disponibilizado.']
        })
      }
      // 2.2- Responder com status 200 e as entradas dos livros disponibilizados pelo usuário
      res.status(200).json(existingBook)
    })
    // 3- Lidar com uma resposta mal sucedida da busca
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
}

exports.addAvailableBook = async (req, res) => {
  try {
    // 1 - Checar se o corpo da requisição é válido
    const validatedBook = await bookSchema.validate(req.body)

    // 2 - Buscar a partir do ISBN se esse livro já existe no nosso banco
    return Book.findOne({ isbn: validatedBook.isbn })
        .then(async existingBook => {
          let newBook
          // 3- Caso esse livro não esteja no nosso banco, criar ele na coleção Books e salvar
          if (!existingBook) {
            // Criando um novo livro
            newBook = new Book(validatedBook)
            // Salvando
            newBook.save()
              .catch(e => {
                console.log(e)
                // Retornando a nossa função mais cedo caso haja um erro ao salvar o livro
                return res.status(303).json({ errors: ['Houve um erro ao criar uma entrada na tabela Users'] })
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
              console.log(e)
              return res.status(500).json({ errors: ['Houve um erro ao criar uma entrada na tabela BookAvailable'] })
            })
        })

  } catch (e) {
    // Retornando erro de validação
    console.log({ e })
    return res.status(400).json(e)
  }
}
