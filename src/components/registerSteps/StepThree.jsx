import React, { useRef, useState } from 'react'
import Input from '../Input'

import '../../scss/InputFile.scss'

const StepThree = ({ setNick, setUserImage, nick, userImage }) => {

  const img = useRef(null)
  const [imgUser, setImgUser] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0]

    setUserImage(file)
    if(file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        setImgUser(e.target.result)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Input 
        name='nick'
        title='Apelido'
        placeholder='fulano06'
        set={setNick}
        value={nick}
        type='text'
      />

      <label>
        <p>Foto de perfil</p>
        <div className='input-container'>
          <label className='input-file'>
            <p>Escolha imagem</p>
            <input type="file" onChange={handleImage} />
          </label>

          <div className='image-modal'>
            {imgUser && <img src={imgUser} />}
          </div>
        </div>
      </label>
    </>
  )
}

export default StepThree