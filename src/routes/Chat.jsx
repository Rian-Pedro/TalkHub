import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import io from "socket.io-client"
import '../scss/Chat.scss'

import { FaPlus } from "react-icons/fa"
import {BiDotsVerticalRounded, BiSearchAlt2} from 'react-icons/bi'
import { MdOutlineClose } from "react-icons/md";

import Contact from '../components/Contact'
import ChatArea from '../components/chat/ChatArea'
import Loader from '../components/Loader'
import ModalAdd from '../components/ModalAdd'
import { UserListContext } from '../contexts/UserListContext'
import UserService from '../services/UserService'

import { NewMessageContext } from "../contexts/NewMessageContext"
import { ChatContextProvider } from '../contexts/ChatContext'
import OptionProfile from '../components/OptionProfile'

// FaRegFaceLaughWink

const Chat = () => {

  const socket = io("https://node-pxcv.onrender.com")

  const { userInfo, setUserInfo } = useContext(UserListContext)
  const { newMessage, setNewMessage } = useContext(NewMessageContext)
  
  const [room, setRoom] = useState('')
  const navigate = useNavigate()
  const [userTalk, setUserTalk] = useState(null)
  const [testeContacts, setTesteContacts] = useState([])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [currentMsg, setCurrentMsg] = useState([])

  const [isOpenOption, setIsOpenOption] = useState(false)

  const profileMenu = useRef(null)

  const openContacts = () => {
    profileMenu.current.classList.replace("close", "open")
  }

  const closeContacts = () => {
    profileMenu.current.classList.replace("open", "close")
  }

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
      
      console.log(token)
      if(token) {
        const userInfo = decodeToken(token)
        userInfo.contacts = await UserService.getAllContacts(userInfo['_id'])
        
        if(!userInfo) {
          navigate('/')
        } else {
          setUserInfo(userInfo)
  
          socket.emit("join_room", {room: userInfo._id})
          setIsLoading(false)
          setTesteContacts(userInfo.contacts)
        }
      } else {
        navigate('/')
      }

      socket.on("notification", (data) => {
        console.log(data)
        const teste = {...userInfo}
        teste.contacts.map(contact => {
          if(contact.id == data.sender) {
            contact.newMsg = true
          }
        })
        setUserInfo(teste)
      })
    }
    
    
    socket.connect()
    teste()

    return () => {
      socket.disconnect()
    }
    
  }, [])
  
  const handleNewChat = (newChat) => {

    if(userTalk && room) socket.emit("leave_room", {room: room})

    socket.emit("start_chat", {user_id: userInfo._id, friend_id: newChat.id})
    setUserTalk(newChat) 
  }

  const handleRemoveNewMsg = (friendId) => {
    const teste = {...userInfo}
    teste.contacts && teste.contacts.map(contact => {
      if(contact.id == friendId) {
        contact.newMsg = false
      }
    })

    setUserInfo(teste)
  }

  const handleAdd = () => {
    setIsAddingNew(true)
  }
  
  const handleOptionHeader = () => {
    setIsOpenOption(!isOpenOption)
  }

  return (
    <>
    <ChatContextProvider>
      {isLoading 
        ? 
        <div className='loader-container'>
          <Loader />
        </div> 
        :
      <>
        <div className='container-chat'>

        <div className={`contacts ${userTalk && "close"}`} ref={profileMenu}>

          <div className='header-contacts'>
            <img 
              src={
                userInfo.userImg 
                ? `https://flask-9ben.onrender.com/getImg?src=${encodeURIComponent(userInfo.userImg)}` 
                : ''
              }
            />

            <div 
              className='profile-menu' 
            >
              <div onClick={handleOptionHeader}>
                <BiDotsVerticalRounded />
              </div>
              {
                userTalk &&
                <div onClick={closeContacts}>
                  <MdOutlineClose />
                </div>
              }
              {
                isOpenOption 
                  && 
                <OptionProfile />  
              }
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
                handleRemoveNewMsg={handleRemoveNewMsg}
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
              openContacts={openContacts}
            />
          }

        </div>

        {isAddingNew && <ModalAdd id={userInfo['_id']} setClose={setIsAddingNew}/>}
      </>}
    </ChatContextProvider>
    </>
  )
}

export default Chat