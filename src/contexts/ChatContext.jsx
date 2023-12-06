import { createContext, useState } from "react";

const ChatContext = createContext()

const ChatContextProvider = ({children}) => {

  const [typingSender, setTypingSender] = useState('')

  return (
    <ChatContext.Provider value={{typingSender, setTypingSender}}>
      {children}
    </ChatContext.Provider>
  )
}

export {ChatContext, ChatContextProvider}