import React from 'react'
import Button from '../../components/Button'
import Name from '../../components/Name'
import './AddCourse.css'

const AddCourse = () => {
  return (
    <div className='add_course_container'>
            
            <form className="form_add_course">
                
                <div>ชื่อคอร์ส</div>
                <input
                    type="text" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    placeholder={'เตรียมสอบภาษาอังกฤษมัธยมปลาย'}
                />
                <div>รายละเอียดคอร์ส</div>
                <textarea type="text" placeholder={'เรียนวันพฤหัส 17.30 - 19.30 น. \nคอร์สที่ 2 : เรียน 10 ครั้ง 2000 บาท'}/>
                <Button to='/student_list/detail_student' name="ยืนยัน" type='ok'></Button>
            </form>
    </div>
  )
}

export default AddCourse