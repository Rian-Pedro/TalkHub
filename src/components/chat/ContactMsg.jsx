import React from 'react'
import '../../scss/chat/ContactMsg.scss'

const ContactMsg = ({text, hour}) => {
  return (
    <div className='msg-line'>
      <div className='card-contact-msg'>

        <p>{text}</p>
        <p>{hour && hour.substring(0, 5)}</p>

        <div className='deco'>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284 312" fill="none">
          <path d="M20.2843 0C2.46617 0 -6.45714 21.5429 6.14216 34.1422L128 156L284 312V156V0H20.2843Z" fill="#D9D9D9"/>
        </svg>

        </div>
      </div>
    </div>
  )
}

export default ContactMsg