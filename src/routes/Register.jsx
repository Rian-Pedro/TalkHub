import React, {useRef, useState} from 'react'
import '../scss/Register.scss'
import { GoDotFill } from 'react-icons/go'
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io'

import { Link, useNavigate } from 'react-router-dom'

import Container from '../components/Container'
import ErrorCard from '../components/ErrorCard'
import StepOne from '../components/registerSteps/StepOne'
import StepTwo from '../components/registerSteps/StepTwo'
import StepThree from '../components/registerSteps/StepThree'
import UserService from '../services/UserService'
import Loader from '../components/Loader'


export const Register = () => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [nick, setNick] = useState('')
  const [userImg, setUserImg] = useState(null)
  const [msgError, setMsgError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const steps = [<StepOne 
                    setName={setName} 
                    setEmail={setEmail} 
                    name={name} 
                    email={email}
                  />, 
                  <StepTwo 
                    setPass={setPass} 
                    setConfirmPass={setConfirmPass} 
                    pass={pass} 
                    confirmPass={confirmPass}
                  />,
                  <StepThree 
                    setNick={setNick}
                    setUserImage={setUserImg}
                    nick={nick}
                    userImage={userImg}
                  />]
  
  const [numActivate, setNumActivate] = useState(0)

  const cardError = useRef(null)

  const navigator = useNavigate()

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('nick', nick)
    formData.append('email', email)
    formData.append('pass', pass)
    formData.append('img', userImg)

    setIsLoading(true)
    const response = await UserService.sendData(formData)
    setIsLoading(false)

    if(response.status === 406) {
      setMsgError(response.message)
      cardError.current.classList.add("visible")
    } else {
      navigator("/login")
    }
  }
  
  const handleNext = () => {
    setNumActivate(numActivate >= 2 ? 0 : numActivate + 1)
  }

  const handleBack = () => {
    setNumActivate(numActivate <= 0 ? 0 : numActivate - 1)
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

        <p>Cadastro</p>

        {isLoading && <Loader />}

        <div className={`container-form ${isLoading ? 'invisible' : ''}`}>
          {steps[numActivate]}

          <div className='button-container'>
            <div className='dot-container'>
              <GoDotFill className={`${numActivate === 0 ? 'activate' : ''}`}/>
              <GoDotFill className={`${numActivate === 1 ? 'activate' : ''}`}/>
              <GoDotFill className={`${numActivate === 2 ? 'activate' : ''}`}/>
            </div>

            {numActivate > 0 && 
            <button onClick={handleBack} className='back-button'>
              <IoIosArrowDropleftCircle />
            </button>}

            <button onClick={numActivate >= 2 ? handleSubmit : handleNext} className='submit-button'>
              {numActivate <= 1 ? <IoIosArrowDroprightCircle /> : 'Enviar'}
            </button>
          </div>


          <p>Faça seu <Link to='../login'>login aqui!</Link></p>
        </div>
      </div>
    </Container>
  )
}