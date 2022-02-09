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
  const [validForm, setFormValidity] = useState(false)

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
  }, [editBlogId])

  useEffect(() => {
    setFormValidity(value.title.split(" ").length <= 10 
    && value.content.split(" ").length <= 200)
  }, [value])

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
      if (validForm) {
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
        setEditBlogId(null)
        setModalVisibility(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancelButton = () => {
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
          <span className={
              (value.title.split(" ").length <= 10
              ? "text-green-500"
              : "text-red-500"
              ) + 
              " opacity-50 text-sm"
            }>
            {
              `${value.title.split(" ").length}/10 words limit`
            }
          </span>
        </div>
        <div className="mb-4">
          <label className="formLabel" htmlFor="content">
            Content 
          </label>
          <textarea
            className="formInput h-52"
            type="text"
            name="content"
            value={value.content}
            onChange={inputHandler}
          />
          <span className={
              (value.content.split(" ").length <= 200
              ? "text-green-500"
              : "text-red-500"
              ) + 
              " opacity-50 text-sm"
            }>
            {
              `${value.content.split(" ").length}/200 words limit`
            }
          </span>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="button bg-indigo-500 hover:bg-indigo-700"
            // onClick={handleClickButton}
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
            onClick={handleCancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm 