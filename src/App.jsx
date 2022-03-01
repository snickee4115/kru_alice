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
import EditTel from './pages/admin/EditTel'
import AdminHeader from './components/AdminHeader'
import Admin from './pages/admin/Admin'





function App() {
  const location = useLocation();
  const [disabledLogo, setDisabledLogo] = useState(false);
  return (
  
      <div className="app_container">
        <AnimateSharedLayout >
          <AnimatePresence >
            {/* <AdminHeader useUndo={true}/> */}
            <Routes key={location.pathname} location={location}>
                <Route exact path='/' element={<Main disabledLogo={disabledLogo} setDisabledLogo={setDisabledLogo}/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='detail' element={<Detail setDisabledLogo={setDisabledLogo}/>}/>
                <Route path='datalist' element={<Datalist/>}/>
                <Route path='admin_login' element={<AdminLogin/>}/>
                <Route path='student_list' element={<Admin/>}>
                  <Route index element={<StudentList/>}/>
                  <Route  path='edit_tel' element={<EditTel/>}/>
                </Route>
                
          </Routes>
          
          </AnimatePresence>
        </AnimateSharedLayout>
      </div>

  )
}

export default App
