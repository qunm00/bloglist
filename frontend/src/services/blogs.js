import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (token, newObject) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const update = async (token, id, content) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  await axios.put(`${baseUrl}/${id}`, content, config)
}

const updateLikes = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  await axios.put(`${baseUrl}/${id}/updateLikes`, {}, config)
}

const exportedObject = {
  getAll,
  getById,
  create,
  update,
  updateLikes,
  remove
}

export default exportedObject