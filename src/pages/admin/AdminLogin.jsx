import React from 'react'
import './AdminLogin.css'
import Button from '../../components/Button'
import AdminLogo from '../../components/AdminLogo'

const AdminLogin = () => {
  return (
    <div className='alogin_container'>
        <div  className='alogo'>
          <AdminLogo/>
        </div>
      <form className="alogin_form_container">
        <div>username</div>
        <input type="text" />
        <div>password</div>
        <input type="password" />

        <Button name='ลงชื่อเข้าใช้'/>
      </form>

    </div>
  )
}

export default AdminLogin