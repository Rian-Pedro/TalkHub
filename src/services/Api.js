import Axios from 'axios'

const api = Axios.create({
  baseURL: 'https://flask-9ben.onrender.com/',

})

export default api