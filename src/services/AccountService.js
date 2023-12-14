import api from "./Api"

class AccountService {

  static async sendEmail(userEmail) {
    const teste = await api.get("/verifyUser", {
      params: {email: userEmail}
    })

    return teste.data
  }

  static async newPass(pass, userEmail) {
    const res = await api.post("/changePass", {newPass: pass, userEmail})
    return res.data
  }

}

export default AccountService