import Axios from 'axios'

const api = Axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export default api