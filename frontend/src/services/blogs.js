import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (event) => {
  const config = {
    headers: { Authorization: token }
  }

  // add name blog
  const message = `Remove blog` 

  if (window.confirm(message)) {
    const response = await axios.delete(`${baseUrl}/${event.target.id}`, {}, config)
    console.log(response.data)
  }
}

const updateLikes = async (event) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${event.target.id}`, {}, config)
  console.log(response.data)
}

export default { 
  getAll,
  create,
  setToken,
  updateLikes,
  remove
 }