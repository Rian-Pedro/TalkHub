import React, { createContext, useState, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Home } from './routes/Home.jsx'
import { Login } from './routes/Login.jsx'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Register } from './routes/Register.jsx'
import Chat from './routes/Chat.jsx'
import { UserListContextProvider } from './contexts/UserListContext.jsx'
import { ForgetPass } from './routes/ForgetPass.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/registro' element={<Register />}/>
      <Route path='/chat' element={<Chat />}/>
      <Route path='/esqueci' element={<ForgetPass />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserListContextProvider>
      <RouterProvider router={router}/>
    </UserListContextProvider>
  </React.StrictMode>,
)
