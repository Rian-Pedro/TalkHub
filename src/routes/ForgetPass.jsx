import { useEffect, useRef, useState } from "react"
import Container from "../components/Container"
import ErrorCard from "../components/ErrorCard"
import Input from "../components/Input"
import Loader from "../components/Loader"
import moment from "moment"

import "../scss/ForgetPass.scss"

import { Link, useNavigate } from "react-router-dom"
import AccountService from "../services/AccountService"

export const ForgetPass = () => {

  const [userEmail, setUserEmail] = useState('')
  const [pass, setPass] = useState('')
  const [msgError, setMsgError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")

  const [numAct, setNumAct] = useState(0)
  
  const cardError = useRef(null)

  const steps = [
    <EmailGet 
      setIsLoading={setIsLoading} 
      setNumAct={setNumAct} 
      setCode={setCode}
      setMsgError={setMsgError}
      setUserEmail={setUserEmail}
      cardError={cardError}
    />,
    <CodeGet 
      setIsLoading={setIsLoading} 
      setNumAct={setNumAct}
      setMsgError={setMsgError}
      code={code} 
      cardError={cardError}
    />,
    <NewPass 
      setIsLoading={setIsLoading} 
      setNumAct={setNumAct}
      userEmail={userEmail} 
    />
  ]


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

        <p>Recuperar conta</p>

        {isLoading && <Loader />}
        <div className={`container-form ${isLoading ? 'invisible' : ''}`}>
          
          {/* <EmailGet setIsLoading={setIsLoading} /> */}

          <div className="steps-container">
            {steps[numAct]}
          </div>

          <p>Faça seu <Link to='../registro'>cadastro aqui!</Link></p>
        </div>
      </div>
    </Container>
  )

}


const EmailGet = ({setIsLoading, setNumAct, setUserEmail, setCode, setMsgError, cardError}) => {

  const [email, setEmail] = useState("");
  
  const handleSubmit = async () => {
    setIsLoading(true)
    const response = await AccountService.sendEmail(email)

    if(response.status == 200) {
      setCode(response.code)
      setUserEmail(email)
      setNumAct(1)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setMsgError(response.message)
      cardError.current.classList.add("visible")
    }

  }

  return (

    <>
      <Input 
        name='email'
        title='Coloque aqui o e-mail da sua conta para o envio do código de recuperação:'
        placeholder='fulaninho@gmail.com'
        set={setEmail}
        value={email}
      />

      <button onClick={handleSubmit} className='submit-button'>Enviar</button>
    </>

  )

}

const CodeGet = ({setIsLoading, setNumAct, setMsgError, cardError, code}) => {

  const [inputCode, setInputCode] = useState("")

  const [remainingTime, setRemainingTime] = useState(moment.duration(2, 'minutes'))

  useEffect(() => {

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = moment.duration(prevTime.asSeconds() -1, 'seconds')
        return newTime.asSeconds() <= 0 ? moment.duration(0, 'seconds') : newTime
      })
    }, 1000)

    return () => clearInterval(interval)

  }, [])

  const handleSubmit = async () => {
    setIsLoading(true)
    if(inputCode !== code) {
      setMsgError("O código não é válido")
      cardError.current.classList.add("visible")
      setIsLoading(false)
    }
    setNumAct(2)
    setIsLoading(false)
  }

  const formatTime = (duration) => {
    const minutes = Math.floor(duration.asMinutes());
    const seconds = Math.floor(duration.asSeconds()) % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>
      <Input 
        name='code'
        title='Preencha aqui o código enviado:'
        placeholder='XXX-XXX'
        set={setInputCode}
        value={inputCode}
        timer={formatTime(remainingTime)}
        max={true}
      />

      <button onClick={handleSubmit} className='submit-button'>Verificar</button>
    </>
  )
}

const NewPass = ({setIsLoading, setMsgError, cardError, userEmail}) => {

  const [pass, setPass] = useState("")
  const [confirm, setConfirm] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await AccountService.newPass(pass, userEmail)
    if(res.status === 200) {
      setIsLoading(false)
      navigate("/login")
    } else {
      setMsgError(res.message)
      cardError.current.classList.add("visible")
      setIsLoading(false)
    }
  }

  return (
    <>
      <Input 
        name='code'
        title='Nova senha:'
        placeholder='••••••'
        set={setPass}
        value={pass}
      />
      <Input 
        name='code'
        title='Confirmar nova senha:'
        placeholder='••••••'
        set={setConfirm}
        value={confirm}
      />

      <button onClick={handleSubmit} className='submit-button'>Enviar</button>
    </>
  )
}