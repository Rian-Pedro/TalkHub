import React, { useRef } from 'react'

import "../scss/Input.scss"

const Input = ({ title, name, placeholder, set, value, type, timer, max }) => {
  const input = useRef(null);
  
  const handleChange = () => {
    set(input.current.value)
  }

  return (
    <label className='input'>
      <p>{title}</p>
      <input 
        type={`${type == 'password' ? 'password' : 'text'}`} 
        name={name} 
        ref={input} 
        placeholder={placeholder} 
        value={value}
        onChange={handleChange}
        maxLength={max ? 7 : 100}
      />
      {timer && <p className='timer'>{timer}</p>}
    </label>
  )
}

export default Input