const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const userExtractor = require('../middlewares/userExtractor')

usersRouter.get('/', userExtractor, async (request, response) => {
  const user = request.user
  if (user) {
    response.json(
      await User
        .find({})
        .populate('blogs')
      )
  } else {
    response.status(401).json({
      message: 'please log in'
    })
  }

})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password) {
    response.status(400).json({
      message: 'Password is required'
    })
  }

  if (body.password.length < 3) {
    response.status(400).json({
      message: 'Password must be longer than or equal to 3 characters'
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
        message: error.message
      })
    }
  }
})

// usersRouter.delete('/', userExtractor, async (request, response) => {
//   const user = request.user
//   if (user) {
//     try {
//       const result = await User.deleteMany({})
//       response.status(404).json({
//         result
//       })
//     } catch(error) {
//       response.status(400).json({
//         message: error.message
//       })
//     }
//   } else {
//     response.status(401).json({
//       message: 'please login'
//     })
//   }
// })

usersRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  if (user) {
    try {
      const result = await User.deleteOne({
        _id: request.params.id
      })
      response.status(404).json({
        result
      })
    } catch(error) {
      response.status(400).json({
        message: error.message
      })
    }
  } else {
    response.status(401).json({
      message: 'please login'
    })
  }
})

module.exports = usersRouter