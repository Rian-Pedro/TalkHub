import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Home } from './routes/Home.jsx'
import { Login } from './routes/Login.jsx'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Register } from './routes/Register.jsx'
import { Chat, loaderChat } from './routes/Chat.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/registro' element={<Register />}/>
      <Route path='/chat' element={<Chat />} loader={loaderChat}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
