import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

import Contact from '../components/Contact'
import ChatArea from '../components/chat/ChatArea'

import '../scss/Chat.scss'
import { decodeToken } from 'react-jwt'

import {BiDotsVerticalRounded, BiSearchAlt2} from 'react-icons/bi'
// FaRegFaceLaughWink

export const Chat = () => {

  let token = useLoaderData()
  const [decode, setDecode] = useState({})
  const navigate = useNavigate()
  const [userTalk, setUserTalk] = useState(null)
  const [testeContacts, setTesteContacts] = useState([])

  useEffect(() => {
    testeContacts.forEach(contact => {
      if(userTalk && contact.id === userTalk.id) {
        contact.chat = [...userTalk.chat]
        localStorage.setItem('contacts', JSON.stringify(testeContacts))
      }
    })
  }, [userTalk])


  useEffect(() => {
    if(!token) {
      navigate('/')
    } else {
      setDecode(decodeToken(token))
      setTesteContacts(JSON.parse(localStorage.getItem('contacts')))
    }
  },[])

  return (
    <div className='container-chat'>

      <div className='contacts'>

        <div className='header-contacts'>
          <img src={`http://localhost:5000/getImg?src=${decode.userImg}`}/>

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
          {testeContacts.map(contact => (
            <Contact user={contact} set={setUserTalk}/>
          ))}
        </div>

      </div>

      {userTalk && <ChatArea user={userTalk} setUser={setUserTalk}/>}

      
    </div>
  )
}

export const loaderChat = async () => {
  const token = localStorage.getItem('token')
  return token
}