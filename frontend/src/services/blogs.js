import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response 

  // const request = axios.get(baseUrl)
  // return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (event) => {
  const config = {
    headers: { Authorization: token }
  }

  const message = `Remove blog`
  if (window.confirm(message)) {
    await axios.delete(`${baseUrl}/${event.target.id}`, {}, config)
  }
}

const updateLikes = async (event) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.put(`${baseUrl}/${event.target.id}`, {}, config)
}


const exportedObject = {
  getAll,
  create,
  setToken,
  updateLikes,
  remove
}

export default exportedObject