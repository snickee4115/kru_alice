import React, { useState } from 'react'
import Button from '../../components/Button'
import './EditCourseTitle.css'

const EditCourseTitle = () => {
  const [course, setCourse] = useState("เตรียมสอบภาษาอังกฤษมัธยมปลาย");


  return (
    <div className='edit_course_container'>
            <div className='edit_course_text'>
                <p>เปลี่ยนชื่อคอร์ส</p>
            </div>
            <form className="form_edit_course">
                <div className='title_form_edit_course'>ชื่อคอร์ส</div>
                <input onChange={(e)=>setCourse(e.target.value)} value={course} type="text" />
                <Button to='/student_list/detail_student' name="ยืนยัน" type='ok'></Button>
            </form>
      </div>
  )
}

export default EditCourseTitle