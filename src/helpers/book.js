const BookAvailable = require("../models/BookAvailable");

// Uma função asíncrona, que irá retornar uma Promise
exports.createAvailableBookEntry = async (book, userId) => {
  // 1- Guardamos dentro de uma variável a nossa nova entrada de BookAvailable, criada com o Model importado e os valores que recemos pelo parâmetro
  const newAvailableBook = new BookAvailable({
    bookId: book.id,
    userId,
  });

  try {
    // 2- Salvamos o livro no banco de dados e retornamos o valor da Promise quando ela for resolvida
    return await newAvailableBook.save();
  } catch (e) {
    console.log(e);
    // Forçamos o retorno de um erro quando algo de errado acontece ao salvarmos o livro disponível
    throw new Error(e);
  }
};
