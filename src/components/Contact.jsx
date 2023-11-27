import React, { useEffect } from 'react'
import yusuke from "../assets/yusuke.png"
import "../scss/Contact.scss"

import io from 'socket.io-client'

const Contact = ({user, set, actual, handleNewChat}) => {

  const handle = () => {
    handleNewChat(user)
  }

  return (
    <div className='contact-card' onClick={handle}>
      <div className='img'>
        <img src={user.userImg ? `http://localhost:5000/getImg?src=${encodeURIComponent(user.userImg)}` : ''} alt="imagem de perfil" />
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