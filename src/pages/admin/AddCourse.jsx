import React, { useState } from 'react'
import Button from '../../components/Button'
import Name from '../../components/Name'
import './AddCourse.css'
import PopUp from '../../components/PopUp'

const AddCourse = () => {
  const [popUp1, setPopUp1] = useState(false);
  const [popUp2, setPopUp2] = useState(false);

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
                <Button 
                  onClick={()=>setPopUp1(!popUp1)}  
                  name="ยืนยัน" 
                  type='ok'
                  typeButton='button'
                  ></Button>
            </form>
      {popUp1 || popUp2 ?
        <PopUp
          content={popUp1 ?
              [
              <div>
                  <div>ต้องการเพิ่มคอร์สชื่อ</div>
                  <div>เตรียมสอบมัธยมปลาย</div>
                  <div>ให้กับ น้องแมว ?</div>
              </div>
              ] : 
              <div>
                  <div>มีเวลาค้างอยู่ในระบบ 1 ชม.</div>
                  <div>ต้องการให้ลงในคอร์สใหม่หรือไม่ ?</div>
              </div>
            }
          ok='ยืนยัน'
          cancel='ยกเลิก'
          onCancel={() => { setPopUp1(false); setPopUp2(false)}}
          onOk={() => {
            if (popUp1) {
              setPopUp1(false);
              setPopUp2(true);
            } else if (popUp2) {
              setPopUp2(false);
            }
          }}
        />
          : null
          }
    </div>
  )
}

export default AddCourse