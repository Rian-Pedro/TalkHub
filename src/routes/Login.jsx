import React, { useRef, useState } from 'react'
import "../scss/Login.scss"

import {useNavigate} from 'react-router-dom'

import Container from '../components/Container'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import ErrorCard from '../components/ErrorCard'
import Loader from '../components/Loader'
import UserService from '../services/UserService'

export const Login = () => {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [msgError, setMsgError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const cardError = useRef(null)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    setIsLoading(true)
    const teste = await UserService.getUserLogin({email: email, pass: pass})
    console.log(teste)
    setIsLoading(false)
    if(teste.status === 202) {
      localStorage.setItem('token', teste.token)
      navigate('/chat')
    } else {
      setMsgError(teste.message)
      cardError.current.classList.add('visible')
    }
  }

  const handleError = () => {
    cardError.current.classList.remove("visible")
  }

  return (
    <Container 
      white={true} 
      notPadding={true} 
      flexRow={true}
    >

      <div className='title-container'>
        <h1>TalkHub</h1>
      </div>

      <div className='login-container'>

        <ErrorCard 
          reference={cardError} 
          handleError={handleError}
          text={msgError}
        />

        <p>Log in</p>

        {isLoading && <Loader />}
        <div className={`container-form ${isLoading ? 'invisible' : ''}`}>
          <Input 
            name='email' 
            title='E-mail' 
            placeholder='exemplo@gmail.com'
            set={setEmail}
            value={email}
          />

          <Input 
            name='password' 
            title='Senha' 
            placeholder='●●●●●●●●●'
            set={setPass}
            value={pass}
            type='password'
          />

          <Link to="/esqueci">Esqueceu a senha?</Link>

          <button onClick={handleSubmit} className='submit-button'>Entrar</button>

          <p>Faça seu <Link to='../registro'>cadastro aqui!</Link></p>
        </div>
      </div>
    </Container>
  )
}