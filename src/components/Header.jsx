import React from 'react'
import '../scss/Header.scss'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <h1>TalkHub</h1>
      <nav>
        <button className='btn-login'>
          <Link to='/login'>Entrar</Link>
        </button>

        <button className='btn-cad'>
          <Link to='/registro'>Cadastrar</Link>
        </button>
      </nav>
    </header>
  )
}

export default Header