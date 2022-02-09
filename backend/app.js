const mongoose = require('mongoose')
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)
  .then(() => {
      console.log('connected to MongoDB')
  })
  .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
  })

const express = require('express')
const app = express()
app.use(express.static('build'))
app.use(express.json())

const cors = require('cors')
app.use(cors())

const tokenExtractor = require('./middlewares/tokenExtractor')
app.use(tokenExtractor)

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

const errorHandler = require('./middlewares/errorHandler')
app.use(errorHandler)

module.exports = app