import React, { useState } from 'react'
import AdminLogo from '../../assets/admin_logo.png'
import AdminHeader from '../../components/AdminHeader'
import './StudentList.css'
import Bin from '../../assets/bin.png'
import Edit from '../../assets/edit.png'
import Button from '../../components/Button'
import PopUp from '../../components/PopUp'

const StudentList = () => {
    const [popup, setPopUp] = useState(false);
    const toggleModal = () => {
        setPopUp(!popup);
    }

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
          <div className='hi_alice'>
              <p>สวัสดีครู <span>อลิส</span></p>
          </div>
        <div className="student_detail">
              {students.map((student) => 
                <div>
                    <span>
                        <div>{student.name}</div>
                        <img style={{cursor:'pointer'}} onClick={toggleModal} src={Bin} alt="" />
                    </span>
                    <span>
                        <div>{student.tel}</div>
                        <img src={Edit} alt="" />
                    </span>
                    {popup ?
                        <PopUp
                                onClose={() => { setPopUp(!popup) }}
                                content={'ยืนยันการลบ '+student.name+' ?'}
                                ok='ยืนยัน'
                                cancel= 'ยกเลิก'
                        />
                        : null}
                </div>
              )}
        </div>
 
              {/* <Button name="เพิ่มนักเรียน" /> */}

          <div className='foot_student_list'>
              <Button type='add' name="เพิ่มนักเรียน" />
              <Button to='/admin_login' type='logout' name="Log out" />
          </div>

    </div>
  )
}

export default StudentList
