import React from 'react'
import '../scss/Container.scss'

const Container = ({ children, white, center, notPadding, flexRow, overHidden }) => {
  return (
    <div 
      className={`container 
                 ${white ? 'white' : ''} 
                 ${center ? 'center' : ''} 
                 ${notPadding ? 'notPadding' : ''} 
                 ${flexRow ? 'flex-row' : ''}
                 ${overHidden ? 'over-hidden' : ''}`}
      >
      {children}
    </div>
  )
}

export default Container