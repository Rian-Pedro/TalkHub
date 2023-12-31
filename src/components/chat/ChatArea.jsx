import React, { useContext, useEffect, useState } from 'react'
import { useRef } from 'react'

import UserMsg from '../../components/chat/UserMsg'
import ContactMsg from '../../components/chat/ContactMsg'

import yusuke from "../../assets/yusuke.png"

import {BiDotsVerticalRounded} from 'react-icons/bi'  
import { FaRegFaceLaugh } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa"
import { PiPaperPlaneRightFill } from "react-icons/pi"  
import Msg from '../../services/MsgService'
import { NewMessageContext } from '../../contexts/NewMessageContext'
import Loader from '../Loader'
import { ChatContext } from '../../contexts/ChatContext'

const ChatArea = ({userTalk, socket, user, room}) => {

  const { newMessage } = useContext(NewMessageContext)
  const { typingSender, setTypingSender } = useContext(ChatContext)

  const chatAreaRef = useRef()

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const inputRef = useRef(null)
  const [messages, setMessages] = useState([])

  const handleEnter = (event) => {
    if(event.key === "Enter") {
      handleSend()
    }
  }

  const handleSend = () => {
    socket.emit("message", {
      sender: user._id, 
      recipient: userTalk.id, 
      content: inputValue, 
      room: room
    })

    setInputValue('')
  }

  const handleTest = (e) => {
    setInputValue(e.target.value)
    socket.emit("typing", {
      sender: user._id,
      recipient: userTalk.id
    })
  }

  useEffect(() => {
    if(newMessage && (newMessage.sender == userTalk.id || newMessage.sender == user._id)) {
      setMessages((current) => [...current, newMessage])
    }
  }, [newMessage])

  useEffect(() => {
    
    if(userTalk) {
      (async () => {
        setIsLoading(true)
        const value = await Msg.getMessages(user._id, userTalk.id)
        setMessages([...value]) 
        setIsLoading(false)
      })()
    }

  }, [userTalk])

  useEffect(() => {
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight
  }, [messages, newMessage])

  return (
    <div className='chat'>
        <div className='chat-header'>

          <div className='contact-img'>
            <img src={`https://flask-9ben.onrender.com/getImg?src=${encodeURIComponent(userTalk.userImg)}`} alt="foto de perfil" />
          </div>

          <div className='header-content'>
            <div className='name-area'>
              <p className='name'>{userTalk.name}</p>
              <p className='status-chat'>
                {typingSender ? 'Digitando...' : 'Online'}
              </p>
            </div>
            <div className='contact-options'>
              <BiDotsVerticalRounded />
            </div>
          </div>

        </div>

        <div className='chat-area' ref={chatAreaRef}>

          <div className='box-msg'>
            
            {isLoading && 
              <div className="spin">
                <Loader/>
              </div>
            }

            {messages && !isLoading && messages.map((message, index) => {
              if(message.sender == user._id) {
                return (
                  <UserMsg 
                    text={message.content} 
                    hour={message.hour} 
                    key={index}
                  />
                )
              } else {
                return (
                  <ContactMsg 
                    text={message.content} 
                    hour={message.hour} 
                    key={index} 
                  />
                )
              }
            })}
            
          </div>  

        </div>

        <div className='send-area'>

          <div className='button-area'>
            <div className='emojis'>
              <FaRegFaceLaugh />
            </div>

            <div className='send-more'>
              <FaPlus />
            </div>
          </div>

          <input 
            type="text" 
            placeholder='Digite algo...' 
            ref={inputRef}
            value={inputValue}
            onChange={(e) => handleTest(e)}
            onKeyDown={handleEnter}
          />

          <div className='send-button' onClick={handleSend}>
            <PiPaperPlaneRightFill />
          </div>

        </div>
      </div>
  )
}

export default ChatArea