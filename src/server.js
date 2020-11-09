/**
 * Module dependencies.
 */
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

/**
 * * Carregar variaveis do arquivo .env file, onde chaves de API e senhas são configuradas
 */
dotenv.config()

/**
 * Routes
 */
const users = require('./routes/user')

/**
 * Create Express server.
 */
const app = express()

/*
  * Conectar com o MongoDB
*/
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8080)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/users', users)

/*
 * Error Handler.
 */
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Server Error')
})

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

module.exports = app
