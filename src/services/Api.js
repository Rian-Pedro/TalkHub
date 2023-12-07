import Axios from 'axios'

const api = Axios.create({
  baseURL: 'http://54.172.232.151:5000/',

})

export default api