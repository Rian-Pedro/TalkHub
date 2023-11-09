import React, { useRef, useState } from 'react'
import "../scss/Login.scss"

import Container from '../components/Container'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import ErrorCard from '../components/ErrorCard'

export const Login = () => {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const cardError = useRef(null)

  const handleSubmit = () => {
    cardError.current.classList.add("visible")
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
        />

        <p>Log in</p>

        <div className="container-form">
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

          <Link>Esqueceu a senha?</Link>

          <button onClick={handleSubmit} className='submit-button'>Entrar</button>

          <p>Faça seu <Link>cadastro aqui!</Link></p>
        </div>
      </div>
    </Container>
  )
}