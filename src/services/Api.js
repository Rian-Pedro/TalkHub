import Axios from 'axios'

const api = Axios.create({
  baseURL: 'https://talkhub-vz8y.onrender.com',

})

export default api