import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { NewMessageContextProvider } from './contexts/NewMessageContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NewMessageContextProvider>
        <Outlet />
      </NewMessageContextProvider>
    </>
  )
}

export default App
