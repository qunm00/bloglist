const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)


const User = require('../models/user')
const Blog = require('../models/blog')

beforeAll(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash('Test1234', 10)
  const user = new User({ 
    username: 'test',
    name: 'Test',
    passwordHash })
  await user.save()
})

describe('testing user authentication and authorization', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({}) 

    const newUser = {
      username: 'quan',
      name: 'Quan',
      password: 'Test123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code and message if username already taken', async() => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'test',
      name: 'Test',
      password: 'Test1234'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fail to create a user without username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      name: 'Superuser',
      password: 'Test1234'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  }) 

  test('fail to create a user without password', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      name: 'Superuser',
      username: 'quan'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is required')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  }) 

  test('fail to create a user with short username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      name: 'Superuser',
      username: 'qu',
      password: 'Test1234'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('shorter than the minimum allowed length')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  }) 

  test('fail to create a user with short password', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      name: 'Superuser',
      username: 'quan',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be longer than or equal to 3 characters')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  }) 

  test('login existing user', async () => {
    await api
      .post('/api/login')
      .send({
        username: 'test',
        password: 'Test1234'
      })
      expect(200)
  })
})

describe('testing blog api endpoints', () => {
  beforeAll(async () => {
    await Blog.deleteMany({})
  })

  let token = null
  beforeEach(async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: 'test',
        password: 'Test1234'
      })
    token = response.body.token 
  })

  test('get empty blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(0)
  })

  test('add a new blog', async () => {
    const newBlog = {
      title: 'blog 1',
      author: 'author 1',
      url: 'www.blog1.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(1)
    expect(titles).toContain('blog 1')
  })

  test('add another blog', async () => {
    const newBlog = {
      title: 'blog 2',
      author: 'author 2',
      url: 'www.blog2.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(2)
    expect(titles).toContain('blog 2')
  })
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })
  
  test('verify unique identifier named id', async () => {
    const response =  await api.get('/api/blogs')
    response.body.map(blog => {
      expect(blog.id).toBeDefined()
    })
  })
  
  test('likes default value', async () => {
    const newBlog = {
      title: 'blog 3',
      author: 'author 3',
      url: 'www.blog3.com',
    }
  
    await api
      .post('/api/blogs')
      .set({Authorization: 'Bearer ' + token})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    let defaultLike = null 
    response.body.forEach(blog => {
      if (blog.title === 'blog 3') {
        defaultLike = blog.likes
      }
    })
  
    expect(defaultLike).toBe(0)
  })
  
  test('missing title and url', async () => {
    const newBlog = {
      author: 'author 4'
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(400)
  })
  
  test('delete', async () => {
    let response = await api.get('/api/blogs') 
    const ids = response.body.map(blog => blog.id)
    await api
      .delete('/api/blogs/' + ids[0])
      .set('Authorization', 'Bearer ' + token)
      .expect(404)
  
    response = await api.get('/api/blogs')
    expect(response.body.length === ids.length - 1).toBe(true)
  })
  
  test('update', async () => {
    let response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)
    await api
      .put('/api/blogs/' + ids[0])
      .set('Authorization', 'Bearer ' + token)
  
    response =  await api
      .get('/api/blogs/' + ids[0])
    const blog = response.body[0]
    expect(blog.likes).toBe(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})