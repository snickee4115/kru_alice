import React from 'react'
import AdminHeader from '../../components/AdminHeader'
import Button from '../../components/Button'
import './EditTel.css'

const EditTel = () => {
    
  return (
      <div className='edit_tel_container'>
            {/* <AdminHeader useUndo={true} /> */}
            <div className='edit_tel_text'>
                <p>แก้ไขเบอร์โทร</p>
            </div>
            <form className="form_edit_tel">
                <div className='own_of_tel'>น้อง แมว</div>
                <input type="number" />
                <Button to='/student_list' name="ยืนยัน" type='ok'></Button>
            </form>
      </div>
  )
}

export default EditTel