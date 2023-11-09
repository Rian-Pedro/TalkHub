import React from 'react'
import Input from '../Input'

const StepOne = ({ setName, setEmail, name, email }) => {
  return (
    <>
      <Input 
        name='name' 
        title='Nome' 
        placeholder='Fulano'
        set={setName}
        value={name}
        type='text'
      />

      <Input 
        name='email' 
        title='E-mail' 
        placeholder='exemplo@gmail.com'
        set={setEmail}
        value={email}
      />
    </>
  )
}

export default StepOne