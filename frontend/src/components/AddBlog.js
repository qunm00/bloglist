import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

function AddBlog() {
  const [value, setValue] = useState({
    title: '',
    author: '',
    url: '',
  })

  const [message, setMessage] = useState(null)

  const inputHandler = (event) => {
    console.log(value)
    setValue({
      ...value,
      [event.target.name]: event.target.value
    })
  }

  const submitBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({
        ...value 
      })
      setMessage(`successfully created ${response.title} written by ${response.author}`)
      setInterval(() => setMessage(null), 5000)
    } catch(error) {
      console.log(error)
      setMessage('fail to create post')
    }
    setInterval(() => setMessage(null), 5000)
  }

  return (
    <>
      <Notification message={message} />
      <form onSubmit={submitBlog}>
        <label htmlFor="title">
          Title
        </label><br/>
        <input type="text" name="title" value={value.title} onChange={inputHandler} />
        <br/>
        <label htmlFor="author">
         Author 
        </label><br/>
        <input type="text" name="author" value={value.author} onChange={inputHandler} />
        <br/>
        <label htmlFor="url">
          URL 
        </label><br/>
        <input type="text" name="url" value={value.url} onChange={inputHandler} />
        <br/>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default AddBlog
