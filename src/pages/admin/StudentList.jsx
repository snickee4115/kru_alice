import React, { useState } from 'react'
import AdminLogo from '../../assets/admin_logo.png'
import AdminHeader from '../../components/AdminHeader'
import './StudentList.css'
import Bin from '../../assets/bin.png'
import Edit from '../../assets/edit.png'
import Button from '../../components/Button'

const StudentList = () => {

    const students = [
        {
            "name": "น้อง แมว",
            "tel": "0847548568"
        },
        {
            "name": "น้อง Japan",
            "tel": "0847548568"
        },
        {
            "name": "น้อง ปอร์น",
            "tel": "0824356485"
        }
    ]
  return (
    <div className='student_list_container'>
        <AdminHeader useUndo={false}/>
        <div className='hi_alice'><p>สวัสดีครู <span>อลิส</span></p></div>
        <div className="student_detail">
              {students.map((student) => 
                <div>
                    <span>
                        <div>{student.name}</div>
                        <img src={Bin} alt="" />
                    </span>
                    <span>
                        <div>{student.tel}</div>
                        <img src={Edit} alt="" />
                    </span>
                </div>
              )}
              
        </div>
 
              {/* <Button name="เพิ่มนักเรียน" /> */}

        
          <div className='foot_student_list'>
              <Button type='add' name="เพิ่มนักเรียน" />
              <Button type='logout' name="Log out" />
          </div>

    </div>
  )
}

export default StudentList