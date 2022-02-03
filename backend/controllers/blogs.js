const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const userExtractor = require('../middlewares/userExtractor')

blogsRouter.get('/', async (request, response) => {
  response.status(200).json(
    await Blog
      .find({})
      .populate('user')
  )
})

blogsRouter.get('/:id', async (request, response) => {
  response.status(200).json(
    await Blog.find({
      _id: request.params.id
    })
  )
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  try {
    const user = request.user

    if (user) {
      const body = request.body
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.like,
        user: user 
      })

      response.status(201).json(
        await Blog.create(blog)
      )
    } else {
      response.status(401).json({
        error: 'Unauthorized Access'
      })
    }

  } catch(error) {
    response.status(400).json({
      error: error.message
    })
  }
})

blogsRouter.delete('/', async (request, response) => {
  response.status(200).json(
    await Blog.deleteMany({})
  )
})

blogsRouter.delete('/:id', async (request, response)  => {
  try {
    const blog = await Blog.findById(request.params.id)

    response.status(200).json(
      await Blog.deleteOne({_id: request.params.id})
    )
  } catch(error) {
    response.status(400).json({
      error: error.message
    })
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  try {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (user) {
      response.status(200).json(
        await Blog.updateOne({
          _id: request.params.id
        }, {
          likes: blog.likes + 1
        })
      )
    } else {
      response.status(403).json({
        error: 'please log in'
      })
    }
  } catch(error) {
    response.status(400).json({
      error: error.message
    })
  }
})

module.exports = blogsRouter