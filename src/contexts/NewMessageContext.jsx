import React, { createContext, useState } from "react";

const NewMessageContext = createContext()

const NewMessageContextProvider = ({children}) => {
  const [newMessage, setNewMessage] = useState({})
  
  return (
    <NewMessageContext.Provider value={{newMessage, setNewMessage}}>
      {children}
    </NewMessageContext.Provider>
  )
}

export { NewMessageContext, NewMessageContextProvider }