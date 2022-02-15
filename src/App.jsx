import { useState } from 'react'
import './App.css'
import Main from './pages/users/Main'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Detail from './pages/users/Detail'
import Login from './pages/users/Login'
import Datalist from './pages/users/Datalist'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import AdminLogin from './pages/admin/AdminLogin'
import StudentList from './pages/admin/StudentList'



function App() {
  const location = useLocation();
  const [disabledLogo, setDisabledLogo] = useState(false);
  return (
  
      <div className="app_container">
        <AnimateSharedLayout >
          <AnimatePresence >
            <Routes key={location.pathname} location={location}>
            <Route path='/' element={<Main disabledLogo={disabledLogo} setDisabledLogo={setDisabledLogo}/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/detail' element={<Detail setDisabledLogo={setDisabledLogo}/>}/>
                <Route path='/datalist' element={<Datalist/>}/>
                <Route path='/admin_login' element={<AdminLogin/>}/>
                <Route path='/student_list' element={<StudentList/>}/>
          </Routes>
          
          </AnimatePresence>
        </AnimateSharedLayout>
      </div>

  )
}

export default App
