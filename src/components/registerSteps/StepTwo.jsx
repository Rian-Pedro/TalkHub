import React from 'react'
import Input from '../Input'

const StepTwo = ({ setPass, setConfirmPass, pass, confirmPass }) => {
  return (
    <>
      <Input 
        name='pass' 
        title='Senha' 
        placeholder='••••••'
        set={setPass}
        value={pass}
        type='password'
      />

      <Input 
        name='confirm-pass'
        title='Confirmar Senha' 
        placeholder='••••••'
        set={setConfirmPass}
        value={confirmPass}
        type='password'
      />
    </>
  )
}

export default StepTwo