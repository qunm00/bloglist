const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  response.json(
    await User
      .find({})
      .populate('blogs')
    )
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password) {
    return response.status(400).json({
      error: 'password is required'
    })
  }

  if (body.password.length < 3) {
    return response.status(400).json({
      error: 'password must be longer than or equal to 3 characters'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    if (error.name === 'ValidationError') {
      response.status(400).json({
        error: error.message
      })
    }
  }
})

usersRouter.delete('/', async (request, response) => {
  try {
    const result = await User.deleteMany({})
    response.status(404).json({
      result
    })
  } catch(error) {
    response.status(400).json({
      error: error.message
    })
  }
})

usersRouter.delete('/:id', async (request, response) => {
  try {
    const result = await User.deleteOne({
      _id: request.params.id
    })
    response.status(404).json({
      result
    })
  } catch(error) {
    response.status(400).json({
      error: error.message
    })
  }

})

module.exports = usersRouter