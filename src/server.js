//Module dependencies.
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Carregar variaveis do arquivo .env file, onde chaves de API e senhas são configuradas
dotenv.config()

//Routes
const users = require('./routes/user')
const books = require('./routes/book')

//Create Express server.

const app = express()

//Conectar com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true

})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

//Express configuration.
app.set('port', process.env.PORT || 8080)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/users', users)
app.use('/api/books', books)

//Error Handler.
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Server Error')
})

// Start Express server.
app.listen(app.get('port'), () => {
  console.log(
    'App is running at http://localhost:%s',
    app.get('port')
  )
  console.log('  Press CTRL-C to stop\n')
})

module.exports = app
