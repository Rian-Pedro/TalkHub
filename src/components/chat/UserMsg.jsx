import React from 'react'
import '../../scss/chat/UserMsg.scss'

const UserMsg = ({text, hour}) => {
  return (
    <div className='msg-line'>
      <div className='card-user-msg'>

        <p>{text}</p>
        <p>{hour && hour.substring(0, 5)}</p>

        <div className='deco'>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284 312" fill="none">
            <path d="M263.716 0C281.534 0 290.457 21.5429 277.858 34.1422L156 156L0 312V156V0H263.716Z" fill="#D9D9D9"/>
          </svg>

        </div>
      </div>
    </div>
  )
}

export default UserMsg