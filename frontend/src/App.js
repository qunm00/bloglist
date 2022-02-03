import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const logoutHandler = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUserData = JSON.parse(loggedUserJSON)
      setUser(loggedUserData)
      blogService.setToken(loggedUserData.token)
    }
  }, [])

  return (
    <div>
      {!user ?
      <Login setUser={setUser}/> :
      <>
        <h2>blogs</h2>
        <div>
          <p>{user.username}</p>
          <button onClick={logoutHandler}>Logout</button>
        </div>
        <br/>
        <Togglable showButton="Create a blog" hideButton="Cancel">
          <AddBlog />
        </Togglable>
        <br/>
        {blogs.sort((first, second) => second.likes - first.likes).map(blog =>
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <Togglable showButton="View" hideButton="Hide">
              <Blog blog={blog} />
            </Togglable>
            <hr/>
          </div>
        )}
      </>
      }
    </div>
  )
}

export default App