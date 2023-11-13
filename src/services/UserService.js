import api from "./Api"

class UserService {
  static async sendData(data) {
    const response = await api.post('/user', data)
    return response.data
  }

  static async getUser(data) {
    const response = await api.get('/user', {
      params: data
    })
    return response.data
  }
}

export default UserService