import axios from 'axios'
const baseUrl = '/api/users'

const register = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response
}

const exportedObject = {
  register
}

export default exportedObject