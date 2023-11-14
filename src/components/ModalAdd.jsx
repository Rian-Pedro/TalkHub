import React, { useState } from 'react'
import Contact from "./Contact"

import UserService from '../services/UserService'
import { FaRegWindowClose } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TbRepeat } from "react-icons/tb";

import '../scss/utils/ModalAdd.scss'

const ModalAdd = ({id, setClose}) => {

  const [inputValue, setInputValue] = useState('')
  const [contactUser, setContactUser] = useState(null)

  const handleGetUser = async () => {
    const contact = await UserService.getUser({email: inputValue})
    if(contact) setContactUser(contact)
  }

  const handleAddNew = async () => {
    const response = await UserService.newContact(id, contactUser.id)
    if(response.status === 202) setClose(false)
  }

  const handleRepeat = () => {
    setContactUser(null)
    setInputValue('')
  }

  return (
    <div className='modal-add'>
      <div className='modal'>
        <div className="close">
          <FaRegWindowClose onClick={() => setClose(false)}/>
        </div>

        {!contactUser ? 
        <>
          <label className='input'>
            <p>Adicione o e-mail do seu amigo:</p>
            <input 
              type="text" 
              value={inputValue} 
              placeholder='fulano@gmail.com'
              onChange={(e) => setInputValue(e.target.value)} 
            />
          </label>

          <button onClick={handleGetUser}>Enviar</button>
        </> : 
        <>
          <Contact user={contactUser} />
          <div className="options">
            <div className='add'>
              <AiOutlineUserAdd onClick={handleAddNew} />
            </div>

            <div className='repeat'>
              <TbRepeat onClick={handleRepeat} />
            </div>
          </div>
        </>}
      </div>
    </div>
  )
}

export default ModalAdd