import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({
  editBlogId,
  setEditBlogId,
  setModalVisibility,
}) => {
  const [value, setValue] = useState({
    title: '',
    content: ''
  })
  const [blogId, setBlogId] = useState(null)

  useEffect(() => {
    let isActive = true
    if (editBlogId && isActive) {
      blogService
        .getById(editBlogId)
        .then(blog => {
          if (blog) {
            setBlogId(blog[0].id)
            setValue({
              title: blog[0].title,
              content: blog[0].content
            })
          }
        })
    }
    return () => isActive = false
  }, [])

  const loggedInUser = window.localStorage.getItem('loggedBlogUser')
  const token = loggedInUser ? JSON.parse(loggedInUser).data.token : null

  const inputHandler = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    })
  }

  const submitBlog = async (event) => {
    event.preventDefault()
    try {
      if (blogId) {
        await blogService.update(
          token,
          blogId,
          {...value}
        )
        setBlogId(null)
      } else {
        await blogService.create(
          token,
          {...value}
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickButton = () => {
    setEditBlogId(null)
    setModalVisibility(false)
  }

  return (
    <div>
      <h3 className="formHeader">
        {
          blogId 
           ? 'Edit blog post'
           : 'Create a new blog post'
        }
      </h3>
      <form onSubmit={submitBlog}>
        <div className="mb-4">
          <label className="formLabel" htmlFor="title">
            Title
          </label>
          <input
            className="formInput"
            autoComplete="off"
            type="text"
            name="title"
            value={value.title}
            onChange={inputHandler} />
        </div>
        <div className="mb-4">
          <label className="formLabel" htmlFor="content">
            Content 
          </label>
          <textarea className="formInput h-52" type="text" name="content" value={value.content} onChange={inputHandler} />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="button bg-indigo-500 hover:bg-indigo-700"
            onClick={handleClickButton}
          >
            {
             blogId 
                ? 'Edit'
                : 'Create'
            }
          </button>
          <button
            type="button"
            className="button bg-orange-500  hover:bg-orange-700"
            onClick={handleClickButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm 