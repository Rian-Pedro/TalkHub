import api from "./Api"

class Msg {
  static async getMessages(userId, friendId) {
    const teste = await api.get('/getMessages', {
      params: {userId, friendId}
    })

    return teste.data
  } 
}

export default Msg