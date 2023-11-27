import React, { createContext, useState } from "react";

const UserListContext = createContext()

const UserListContextProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({})
  
  return (
    <UserListContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserListContext.Provider>
  )
}

export { UserListContext, UserListContextProvider }