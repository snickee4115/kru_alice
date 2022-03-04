import React from 'react'
import { Outlet } from 'react-router-dom'
import Name from '../../components/Name'
import './DetailStudentRoutes.css'

const DetailStudentRoutes = () => {
  return (
      <div className='detail_student_routes_container'>
        <div className="name_label">
                <Name name='น้อง แมว'/>
        </div>
        <Outlet/>
      </div>
  )
}

export default DetailStudentRoutes