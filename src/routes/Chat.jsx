import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import io from "socket.io-client"
import '../scss/Chat.scss'

import { FaPlus } from "react-icons/fa"
import {BiDotsVerticalRounded, BiSearchAlt2} from 'react-icons/bi'

import Contact from '../components/Contact'
import ChatArea from '../components/chat/ChatArea'
import Loader from '../components/Loader'
import ModalAdd from '../components/ModalAdd'
import { UserListContext } from '../contexts/UserListContext'
import UserService from '../services/UserService'

import { NewMessageContext } from "../contexts/NewMessageContext"

// FaRegFaceLaughWink

const Chat = () => {

  const socket = io("http://localhost:5000")

  const { userInfo, setUserInfo } = useContext(UserListContext)
  const { newMessage, setNewMessage } = useContext(NewMessageContext)

  const { token, setToken } = useState('');
  const [room, setRoom] = useState('')
  const navigate = useNavigate()
  const [userTalk, setUserTalk] = useState(null)
  const [testeContacts, setTesteContacts] = useState([])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [currentMsg, setCurrentMsg] = useState([])

  socket.on("chat_started", (data) => {
    setRoom(data.room)
    console.log(data)
  })

  socket.on("message_sended", (data) => {
    setNewMessage(data)
  })

  useEffect(() => {
      const teste = async () => {
      const token = localStorage.getItem('token')
      const userInfo = decodeToken(token)
      userInfo.contacts = await UserService.getAllContacts(userInfo['_id'])
      
      if(!token) {
        navigate('/')
      } else {
        setUserInfo(userInfo)
        socket.emit("join_room", {room: userInfo._id})
        setIsLoading(false)
        setTesteContacts(userInfo.contacts)
      }
    }
    
    teste()
    
  }, [])
  
  const handleNewChat = (newChat) => {

    if(userTalk && room) socket.emit("leave_room", {room: room})

    socket.emit("start_chat", {user_id: userInfo._id, friend_id: newChat.id})
    setUserTalk(newChat) 
  }

  const handleAdd = () => {
    setIsAddingNew(true)
  }

  return (
    <>
      {isLoading 
      ? 
      <div className='loader-container'>
        <Loader />
      </div> 
      :
      <>
        <div className='container-chat'>

        <div className='contacts'>

          <div className='header-contacts'>
            <img 
              src={
                userInfo.userImg 
                ? `http://localhost:5000/getImg?src=${encodeURIComponent(userInfo.userImg)}` 
                : ''
              }
            />

            <div className='profile-menu'>
              <BiDotsVerticalRounded />
            </div>
          </div>

          <div className='search'>
            <div> 
              <BiSearchAlt2 />
            </div>
            <input type="text" placeholder='Busque por um usuário pelo nome ou e-mail' />
          </div>

          <div className='contact'>
            {userInfo.contacts && userInfo.contacts.map(contact => (
              <Contact 
                user={contact} 
                actual={userTalk} 
                handleNewChat={handleNewChat}
                key={contact.id}
              />
            ))}
            <div className='adicionar' onClick={handleAdd}>
              Adicionar
              <FaPlus />
            </div>
          </div>

        </div>

        {userTalk && 
          <ChatArea 
            userTalk={userTalk} 
            user={userInfo} 
            room={room} 
            setUser={setUserTalk} 
            socket={socket}
          />
        }

        </div>

        {isAddingNew && <ModalAdd id={userInfo['_id']} setClose={setIsAddingNew}/>}
      </>}
    </>
  )
}

export default Chat