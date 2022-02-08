import { useState } from 'react'
import loginService from '../services/login'
import userService from '../services/user'
import Notification from './Notification'

const Login = ({
  setUser
}) => {
  const [formValue, setFormValue] = useState({
    username: '',
    password: ''
  })

  const [formValidation, setFormValidation] = useState({
    usernameLength: false,
    passwordRequired: false,
  })

  const [message, setMessage] = useState(null)
  const [notificationState, setNotificationState] = useState(false)

  const inputHandler = ({ target: { name, value } }) => {
    if (name === 'username') {
      setFormValidation({...formValidation, usernameLength: value.length > 2})
    }

    if (name === 'password') {
      setFormValidation({ ...formValidation, passwordRequired: value.length > 0})
    }

    setFormValue({...formValue, [name]: value})
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    if (event.nativeEvent.submitter.name === 'signin') {
      try {
        const user = await loginService.login({...formValue})
        window.localStorage.setItem(
          'loggedBlogUser', JSON.stringify(user)
        )
        setUser(user)
      } catch (error) {
        setNotificationState(false)
        setMessage(error.response.data.message)
        setInterval(() => setMessage(null), 5000)
      }
    } else {
      try {
        await userService.register({...formValue})
        setNotificationState(true)
        setMessage(`${formValue.username} was successfully created.`)
        setInterval(() => setMessage(null), 5000)
      } catch (error) {
        setNotificationState(false)
        setMessage(error.response.data.message)
        setInterval(() => setMessage(null), 5000)
      }
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-xs">
        <Notification message={message} notificationState={notificationState}/>
        <h2 className="formHeader">Sign in to your account</h2>
        <form 
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={submitHandler}
        >
          <div className="mb-4">
            <label className="formLabel" htmlFor="username">
              Username
            </label>
            <input
              className="formInput" 
              autoComplete="off"
              name="username"
              type="text"
              placeholder="Username"
              value={formValue.username}
              onChange={inputHandler}
            />
          </div>
          <div className="mb-6">
            <label className="formLabel" htmlFor="password">
              Password
            </label>
            <input 
              className="formInput"
              autoComplete="off"
              name="password"
              type="password"
              placeholder="*******"
              value={formValue.password}
              onChange={inputHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="button bg-blue-500 hover:bg-blue-700"
              type="submit"
              name="signin"
            >
              Sign In
            </button>
            <button 
              className="button bg-green-500 hover:bg-green-700"
              type="submit"
              name="signup"
            >
              Sign Up 
            </button>
          </div>
        </form>
        <div>
          <p>
            <span className={ 
              (formValidation.usernameLength 
              ? "text-green-400" 
              : "text-red-400")
            }>
              ✓
            </span> 
            <span className="opacity-50">Username must have at least three letters.</span>
          </p>
          <p>
            <span className={ 
              (formValidation.passwordRequired
              ? "text-green-400" 
              : "text-red-400")
            }>
              ✓
            </span> 
            <span className="opacity-50">Password is required</span>
          </p>          
        </div>
      </div>
    </div>
  )
}

export default Login
