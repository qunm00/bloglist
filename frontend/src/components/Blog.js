import React from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  return (
  <>
    <p>{blog.url}</p>
    <p>
      {blog.likes}&nbsp;<button id={blog.id} name="like" onClick={blogService.updateLikes}>like</button>
    </p>
    <p>{blog.author}</p>
    <button id={blog.id} name="remove" onClick={blogService.remove}>Remove</button>
  </>  
 )
}

export default Blog