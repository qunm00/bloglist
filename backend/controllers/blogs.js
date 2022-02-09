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
  try {
    const blog = await Blog.find({
      _id: request.params.id
    })
    response.status(200).json(blog)
  } catch (error) {
    response.status(400).json({
      message: error.message 
    })
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  try {
    const user = request.user

    if (user) {
      const body = request.body
      const blog = new Blog({
        title: body.title,
        author: user.username,
        content: body.content,
        likes: body.like,
        user: user 
      })

      response.status(201).json(
        await Blog.create(blog)
      )
    } else {
      response.status(401).json({
        message: 'please log in'
      })
    }

  } catch(error) {
    response.status(400).json({
      message: error.message
    })
  }
})

blogsRouter.delete('/', userExtractor, async (request, response) => {
  const user = request.user
  try {
    if (user) {
      response.status(200).json(
        await Blog.deleteMany({})
      )
    } else {
      response.status(401).json({
        message: 'please log in'
      })
    }
  } catch (error) {
    response.status(400).json({
      message: error.message
    })
  }
  
})

blogsRouter.delete('/:id', userExtractor, async (request, response)  => {
  try {
    const user = request.user

    if (user) {
      response.status(200).json(
        await Blog.deleteOne({_id: request.params.id})
      )
    } else {
      response.status(401).json({
        message: 'please log in'
      })
    }

  } catch(error) {
    response.status(400).json({
      message: error.message
    })
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  try {
    const user = request.user
    const body = request.body

    if (user) {
      response.status(200).json(
        await Blog.updateOne({
          _id: request.params.id
        }, {
          title: body.title,
          content: body.content
        })
      )
    } else {
      response.status(401).json({
        message: 'please log in'
      })
    }
  } catch (error) {
    response.status(400).json({
      message: error.message
    })
  }
})

blogsRouter.put('/:id/updateLikes', userExtractor, async (request, response) => {
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
      response.status(401).json({
        message: 'please log in'
      })
    }
  } catch(error) {
    response.status(400).json({
      message: error.message
    })
  }
})

module.exports = blogsRouter