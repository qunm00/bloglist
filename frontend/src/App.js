import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import BlogModal from './components/BlogModal'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [modalVisibility, setModalVisibility] = useState(false)
  const [editBlogId, setEditBlogId] = useState(null)

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const createHandler = () => {
    setModalVisibility(true)
  }

  useEffect(() => {
    let isMounted = true
    blogService.getAll().then(blogs => {
      if (isMounted) setBlogs(blogs)
    })
    return () => isMounted = false
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

    if (loggedUserJSON) {
      const loggedUserData = JSON.parse(loggedUserJSON)
      setUser(loggedUserData)
    }
  }, [])

  return (
    <div>
      {!user 
      ? <Login setUser={setUser}/> 
      :
      <>
        <BlogModal 
          editBlogId={editBlogId}
          setEditBlogId={setEditBlogId}
          modalVisibility={modalVisibility} 
          setModalVisibility={setModalVisibility} 
        />
        <nav className="lg:flex lg:justify-between items-center bg-slate-200 p-6">
          <div className="items-center text-black mr-6">
            <span className="font-semibold text-xl tracking-tight">
              World's Next Big Blog
            </span>
          </div>
          <div>
            <p>Logged in as {user.data.username}</p>
          </div>
          <div className="flex justify-between">
            <button className="button bg-indigo-500 hover:bg-indigo-700" onClick={createHandler}>Create a new blog post</button>
            <button className="button bg-orange-500 hover:bg-orange-700" onClick={logoutHandler}>Logout</button>
          </div>
        </nav>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.sort((first, second) => 
            second.user.username
              .toLowerCase()
              .localeCompare(first.user.username.toLowerCase()))
            .map(blog =>
              <Blog 
                key={blog.id}
                blog={blog}
                setModalVisibility={setModalVisibility}
                setEditBlogId={setEditBlogId}
              />
          )}
        </div>
      </>
      }
    </div>
  )
}

export default App