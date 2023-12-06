import React, { useEffect } from 'react'
import "../scss/Contact.scss"

import io from 'socket.io-client'
import { useContext } from 'react'
import { UserListContext } from '../contexts/UserListContext'
import { useState } from 'react'
import { NewMessageContext } from '../contexts/NewMessageContext'
import { ChatContext } from '../contexts/ChatContext'

const Contact = ({user, set, handleNewChat, handleRemoveNewMsg, actual}) => {
  const { userInfo } = useContext(UserListContext)
  const { newMessage } = useContext(NewMessageContext)
  const { typingSender, setTypingSender } = useContext(ChatContext)
  
  const [isNew, setIsNew] = useState(false)
  // const [typingSender, setTypingSender] = useState('')
  let interval

  useEffect(() => {
    const socket = io("https://talkhub-vz8y.onrender.com")

    socket.emit("join_room", {room: userInfo._id})

    socket.on("notification", (data) => {
      console.log(data)
    })

    socket.on('user_typing', (data) => {
      console.log(data)
      console.log(user)
      if(data.sender == user.id) {
        
        setTypingSender(data.sender)
        if(interval) clearTimeout(interval)
        
        interval = setTimeout(() => {
          setTypingSender('')
        }, 1500)
      }
    })
  }, [])

  useEffect(() => {
    console.log(userInfo)
    console.log(newMessage)
    if(newMessage.sender == user.id && ((actual && actual.id != user.id) || (!actual))) {
      console.log(actual && actual.id)
      setIsNew(true)
    } 
    // console.log(actual, user)
  }, [newMessage])

  const handle = () => {
    handleNewChat(user)
    handleRemoveNewMsg(user.id)
    setIsNew(false)
  }

  return (
    <div className='contact-card' onClick={handle}>
      <div className='img'>
        <img src={user.userImg ? `https://talkhub-vz8y.onrender.com/getImg?src=${encodeURIComponent(user.userImg)}` : ''} alt="imagem de perfil" />
        {(isNew && newMessage.sender == user.id) && 
          <div className='newMsg'>!</div>
        }
      </div>
      <div className='desc'>
        <p className='name'>{user.name}</p>
        {/* {set && <p>00:00</p>} */}
        {
          typingSender && typingSender == user.id 
          ? 
          <p className='status-chat'>Digitando...</p>
          :
          <p className='status-chat'>Online</p>
        }
        {!set && <p className='user-nick'>#{user.nick}</p>}
      </div>
    </div>
  )
}

export default Contact