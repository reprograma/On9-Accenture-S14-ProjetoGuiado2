/**
 * Module dependencies.
 */
const express = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config()

/**
 * Create Express server.
 */
const app = express()

/**
 * Connect to MongoDB.
 */
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error(err)
    console.log(
      '%s MongoDB connection error. Please make sure MongoDB is running.',
      chalk.red('✗')
    )
  })

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8080)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler())
} else {
  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Server Error')
  })
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

module.exports = app
