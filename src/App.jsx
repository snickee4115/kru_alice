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
import AddStudent from './pages/admin/AddStudent'
import DetailStudent from './pages/admin/DetailStudent'
import EditCourseTitle from './pages/admin/EditCourseTitle'
import AddCourse from './pages/admin/AddCourse'
import DetailStudentRoutes from './pages/admin/DetailStudentRoutes'
import AuthProvider from './context/auth'
import EditData from './pages/admin/EditDatalist'
import AdminDatalist from './pages/admin/AdminDatalist'

function App() {
  const location = useLocation();
  const [disabledLogo, setDisabledLogo] = useState(false);
  return (
  
      <AuthProvider>
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
                  <Route path='edit_data' element={<EditData/>}/>
                  <Route path='Admin_datalist' element={<AdminDatalist/>}/>
                  <Route path='student_list' element={<Admin/>}>
                    <Route index element={<StudentList/>}/>
                    <Route  path='edit_tel/:stdid' element={<EditTel/>}/>
                    <Route  path='add_student' element={<AddStudent/>}/>
                    <Route  path='detail_student/:stdid' element={<DetailStudentRoutes/>}>
                      <Route  index element={<DetailStudent/>}/>
                      <Route  path='edit_course_title/:courseid' element={<EditCourseTitle/>}/>
                      <Route  path='add_course/' element={<AddCourse/>}/>
                    </Route>
                    <Route  path='detail_student/edit_course_title' element={<EditCourseTitle/>}/>
                    <Route  path='detail_student/add_course' element={<AddCourse/>}/>
                
                  </Route>
                  
        
            </Routes>
        
            </AnimatePresence>
          </AnimateSharedLayout>
        </div>
      </AuthProvider>

  )
}

export default App
