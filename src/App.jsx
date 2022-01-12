import { useState } from 'react'
import './App.css'
import Main from './pages/users/Main'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div className="app_container">
          <Routes>
              <Route path='/' element={<Main/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
