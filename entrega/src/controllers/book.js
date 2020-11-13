const { BookSchema } = require('../validators/book')
const Book = require('../models/Book')
const BookAvailable = require('../models/BookAvailable')
const { createAvailableBookEntry } = require('../helpers/book')

//GET - Mostrar todos os livros cadastrados

exports.showAllBooks = async (req, res) => {
    Book.find()
        .then((books) => { res.status(200).json(books) })
        .catch(err => { res.status(500).json(err) })
}


//GET - Listar todos os livros cadastrados por aquele ID que foi passado como parâmetro da requisição

exports.getAvailableBooksFromUser = async (req, res) => {
    const booksList = await BookAvailable.find({ userId: req.params.id })
    if (booksList.length > 0) {
        res.status(200).json({ messagem: `Essa é a lista de livros associados ao id inserido`, booksList })
    } else {
        console.log(`Infelizmente, esse usuário ainda não disponibilizou nenhum livro`)
        res.status(204).json({ message: `Infelizmente, esse usuário ainda não disponibilizou nenhum livro` })
    }
}

//POST - Cadastrar um livro na coleção Book e, se já existir nela, efetuar a inserção dele na coleção AvailableBooks.

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
                            return res.status(303).json({ errors: ['Houve um erro ao criar uma entrada na tabela Book'] })
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

