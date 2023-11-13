import React, { useEffect, useState } from 'react'

import UserMsg from '../../components/chat/UserMsg'
import ContactMsg from '../../components/chat/ContactMsg'

import yusuke from "../../assets/yusuke.png"
import {BiDotsVerticalRounded} from 'react-icons/bi'  
import { FaRegFaceLaugh } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa"
import { PiPaperPlaneRightFill } from "react-icons/pi"  

import { useRef } from 'react'

const ChatArea = ({user, setUser}) => {

  const chatAreaRef = useRef()
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  const handleSend = () => {
    setUser({
              name: user.name, 
              id: user.id, 
              chat: [...user.chat, 
                     {
                      id: '1a', 
                      msg: inputValue
                    }]})
  }

  const handleTest = (e) => setInputValue(e.target.value)

  useEffect(() => {
    chatAreaRef.current.scrollTo(0, chatAreaRef.current.scrollHeight)
  }, [user])

  return (
    <div className='chat'>
        <div className='chat-header'>

          <div className='contact-img'>
            <img src={yusuke} alt="foto de perfil" />
          </div>

          <div className='header-content'>
            <p>{user.name}</p>
            <div className='contact-options'>
              <BiDotsVerticalRounded />
            </div>
          </div>

        </div>

        <div className='chat-area' ref={chatAreaRef}>

          <div className='box-msg'>
            {user.chat.map((message, index) => {
              if(message.id == '1a') {
                return (<UserMsg text={message.msg} key={index}/>)
              } else {
                return (<ContactMsg text={message.msg} key={index} />)
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
          />

          <div className='send-button' onClick={handleSend}>
            <PiPaperPlaneRightFill />
          </div>

        </div>
      </div>
  )
}

export default ChatArea