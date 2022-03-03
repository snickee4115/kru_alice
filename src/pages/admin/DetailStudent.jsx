import React, { useState } from 'react'
import Name from '../../components/Name'
import './DetailStudent.css'
import Bin from '../../assets/bin.png'
import Edit from '../../assets/edit.png'
import Button from '../../components/Button'
import PopUp from '../../components/PopUp'

const DetailStudent = () => {

  const [popUp, setPopUp] = useState(false);

  const list_course = [
    { title: 'เตรียมสอบอังกฤษประถมต้น', hours:'9/10'},
    { title: 'เตรียมสอบอังกฤษประถมปลาย', hours:'5/10'},
    { title: 'เตรียมสอบอังกฤษมัธยมต้น', hours:'เกิน 1 hr. 0 Sec.'},

  ]
  return (
      <div className='detail_student_container'>
          <div className="name_label">
            <Name name='น้อง แมว'/>
          </div>
          <div className='course_label_text'>COURSE</div>
          <div className="student_list_course">
            {list_course.map((value) =>
                <div className='wrapper_student_course'>
                    <div>{value.title}</div>
                    <div>
                      <img style={{cursor:'pointer'}} src={Bin} onClick={()=> setPopUp(!popUp)}/>
                      <img src={Edit} />
                      <span style={{ color: value.hours.length > 5 ? '#D91919' : '#3C00E9' }}>{value.hours}</span>
                    </div>
                </div>
              )
            }
          </div>
      {popUp ? 
        <PopUp ok='ยืนยัน' cancel='ยกเลิก' onClose={()=> setPopUp(!popUp)} content={
            [
            <div>
                <div>ยืนยันการลบ</div>
                <div>เตรียมสอบอังกฤษประถมต้นหรือไม่ ?</div>
            </div>
            ]
          }
        />
          :null}
      <div style={{
        display: 'flex',
        flexDirection: 'column', margin: '15% 0',
        marginTop: 'auto', alignItems:'center'
      }}>
            <div className='hours_over_text'>
              มีชั่วโมงที่เกินมาในระบบ 1 Hr. 0 Sec.
            </div>
            <Button name='เพิ่มคอร์ส' type='add'></Button>
          </div>
          
        
      </div>
  )
}

export default DetailStudent