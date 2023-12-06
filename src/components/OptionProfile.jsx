import React from 'react'
import '../scss/OptionProfile.scss'

import { redirect, useNavigate } from 'react-router-dom'

const OptionProfile = () => {

  const navigate = useNavigate()

  const handleExit = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("contacts")
    navigate('/')
  }

  return (
    <div className='option-container'>
      <div className="decorator">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284 312" fill="none">
          <path d="M263.716 0C281.534 0 290.457 21.5429 277.858 34.1422L156 156L0 312V156V0H263.716Z" fill="#454444"/>
        </svg>
      </div>

      <div className='content-option'>
        <div className='btn exit' onClick={handleExit}>
          Sair
        </div>
      </div>
    </div>
  )
}

export default OptionProfile