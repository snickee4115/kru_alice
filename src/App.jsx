import { useState } from 'react'
import './App.css'
import Main from './pages/users/Main'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Detail from './pages/users/Detail'
import Login from './pages/users/Login'

function App() {

  return (
    <BrowserRouter>
      <div className="app_container">
          <Routes>
              <Route path='/' element={<Main/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/detail' element={<Detail/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
