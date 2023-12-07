import Axios from 'axios'

const api = Axios.create({
  baseURL: 'http://54.242.165.37:5000/',

})

export default api