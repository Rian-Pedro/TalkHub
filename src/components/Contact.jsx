import React from 'react'
import yusuke from "../assets/yusuke.png"
import "../scss/Contact.scss"

const Contact = ({user, set}) => {
  return (
    <div className='contact-card' onClick={() => {set(user)}}>
      <div className='img'>
        <img src={yusuke} alt="imagem de perfil" />
      </div>
      <div className='desc'>
        <p>{user.name}</p>
        {set && <p>00:00</p>}
        {!set && <p>#{user.nick}</p>}
      </div>
    </div>
  )
}

export default Contact