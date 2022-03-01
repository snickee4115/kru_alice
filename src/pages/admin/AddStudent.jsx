import React from 'react'
import Button from '../../components/Button'
import './AddStudent.css'

const AddStudent = () => {
  return (
      <div className='add_student_container'>
          <form className="form_add_student">
              <div>ชื่อ</div>
              <input type="text" />
              <div>เบอร์มือถือ</div>
              <input type="number" />
              <div>ชื่อคอร์สแรก</div>
              <input type="text" />
              <Button to='/student_list' name="ยืนยัน" type='ok'></Button>
          </form>
      </div>
  )
}

export default AddStudent