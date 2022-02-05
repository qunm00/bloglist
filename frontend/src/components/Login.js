import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

function Login({setUser}) {
  const [value, setValue] = useState({
    username: '',
    password: ''
  })

  const [message, setMessage] = useState(null)

  const inputHandler = (event) => {
    setValue({...value, [event.target.name]: event.target.value})
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        ...value
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

    } catch(error) {
      console.log(error)
      setMessage('invalid username or password')
      setInterval(() => setMessage(null), 5000)
    }
  }

  return (
    <div>
      <h1>login to application</h1>
      <p className="text-3xl font-bold underline">Hello World</p>
      <Notification message={message}/>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">username</label><br/>
        <input 
          type="text"
          value={value.username}
          name="username"
          onChange={inputHandler}/><br/>
        <label htmlFor="password">password</label><br/>
        <input
          type="password"
          value={value.password}
          name="password"
          onChange={inputHandler}/><br/>
        <input name="submit" type="submit" value="Login"/>
      </form>
    </div>
  )
}

export default Login
