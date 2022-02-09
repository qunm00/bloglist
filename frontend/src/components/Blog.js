import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ 
  blog,
  setModalVisibility,
  setEditBlogId
}) => {
  const [showAll, setShowAll] = useState(blog.content.length < 50)
  const loggedInUser = window.localStorage.getItem('loggedBlogUser')
  const token = loggedInUser ? JSON.parse(loggedInUser).data.token : null
  const username = loggedInUser ? JSON.parse(loggedInUser).data.username : null

  const handleRemove = () => {
    const message = `Remove blog ${blog.title}`
    if (window.confirm(message)) {
      blogService.remove(token, blog.id)
    }
  }

  const handleUpdateLikes = () => {
    blogService.updateLikes(token, blog.id)
  }

  const handleEdit = () => {
    setEditBlogId(blog.id)
    setModalVisibility(true)
  }

  return (
    <div className="m-5 p-5 border border-gray-200 rounded-sm shadow-lg">
      <div className="text-gray-900 font-bold text-xl mb-2">{blog.title}</div>
      <div className="mt-5">
        {
          (!showAll && blog.content.length > 50)
            ? <p>{blog.content.substring(0, 50) + "... "}
                <button
                  className="
                    underline 
                    decoration-2
                    decoration-indigo-500
                  "
                  onClick={() => {
                    setShowAll(true)
                  }}
                >
                  See more
                </button>
              </p>
            : (showAll && blog.content.length > 50)
              ? <p>{blog.content + "... "}
                  <button
                    className="
                      underline 
                      decoration-2
                      decoration-indigo-500
                    "
                    onClick={() => setShowAll(false)}
                  >
                    See less
                  </button>
                </p>
              : <p>{blog.content}</p>
        }
      </div>
      <div className="mt-10 mb-5">
        <p>written by {blog.user.username}</p>
      </div>
      <div className="flex justify-between">
        <p> 
          {`${blog.likes} ${blog.likes > 1 ? ' likes' : ' like'}`}
        </p>
        <div className="flex justify-end">
          {
            username === blog.user.username 
              ? <>
                  <button id={blog.id} className="button bg-orange-500 hover:bg-orange-700" name="edit" onClick={handleEdit}>Edit</button>
                  <button id={blog.id} className="button bg-red-500 hover:bg-red-700" name="remove" onClick={handleRemove}>Remove</button>
                </>
              : <button id={blog.id} className ="button bg-emerald-500 hover:bg-emerald-700" name="like" onClick={handleUpdateLikes}>Like</button>
          }
        </div>
      </div>
  </div>  
 )
}

export default Blog