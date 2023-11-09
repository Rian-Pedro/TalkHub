import api from "./Api"

class UserService {
  static async sendData(data) {
    const response = await api.post('/user', data)
    console.log(response)
  }
}

export default UserService