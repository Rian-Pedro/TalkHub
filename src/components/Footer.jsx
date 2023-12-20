import React from 'react'
import "../scss/Footer.scss"

import { Link } from 'react-router-dom'

import personalLogo from "../assets/rianLogo.svg"

const Footer = () => {
  return (
    <footer>
      <div className='top'>
        <h1>TalkHub</h1>
        <ul>

          <div>
            <li><Link>Login</Link></li>
            <li><Link>Cadastro</Link></li>
          </div>
          
          <div>
            <li><Link>Chat</Link></li>
            <li><Link>Sobre o Criador</Link></li>
          </div>
        
        </ul>
      </div>

      <div className='bottom'>
        <p>Designed and developed by <span>Rian Alves</span></p>
        <img src={personalLogo} alt="" />
      </div>
    </footer>
  )
}

export default Footer