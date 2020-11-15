const { bookSchema } = require('../validators/book')

/* Mostrar livros disponibilizados por um usuário específico */
exports.getAvailableBooksFromUser = async(req, res) => {
  const BooksFromUser = await bookAvailable.find({userId: req.params.id})  
  return BooksFromUser
  .then(books)
  if(Object.keys(books).length > 0){
    return res.status(200).json({
      message: "Esse usuário disponibilizou esse(s) livro(s) para doação: ",
      books)     
  }else{
    res.status(204).json({
      message: "No momento, esse usuário não possui livros disponíveis para doação!"
    })
  .catch(e){
    error: e,
    message: "Ops! Ocorreu algum problema, tente novamente!"
  }
  }
  }
}

/* Cadastrar um novo livro para doação */
exports.addAvailableBook = async (req, res) => {
  try {
    const validatedBook = bookSchema.validate(req.body)
    return Book.findOne({ isbn: validatedBook.isbm })
        .then(async existingBook => {
          let newBook
          if (!existingBook) {            
            newBook = new Book(validatedBook)            
            newBook.save()
              .catch(e => {
                console.log(e)
                return res.status(303).json({ errors: ['Houve um erro ao criar uma entrada na tabela Users'] })
              })
          }

          createAvailableBookEntry(
            existingBook || newBook,
            validateBook.userId
          )
            .then(bookAvailable => res.status(500).json({ errors: ['Houve um erro ao criar uma entrada na tabela BookAvailable'] }))
            .catch(e => {
              return res.status(200).json(bookAvailable)
            })
        })
  } catch (e) {
    console.log({ e })
    return res.status(200).json(e)
  }
}
