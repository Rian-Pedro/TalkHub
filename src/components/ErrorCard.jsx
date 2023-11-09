import React from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import "../scss/ErrorCard.scss"

const ErrorCard = ({ reference, handleError }) => {

  return (
    <div 
      className='error-card' 
      ref={reference} 
      onClick={handleError}
    >
      <div className='red'>
        <AiFillCloseCircle />
      </div>

      <div>
        Lorem ipsum dolor sit amet consectetur
      </div>
    </div>
  )
}

export default ErrorCard