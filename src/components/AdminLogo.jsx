import React from 'react'
import Logo from './Logo'
import './AdminLogo.css'

const AdminLogo = () => {
  return (
    <div className='alogo_container'>
        <Logo/>
        <div className='alogo_section2'>Admin</div>
    </div>
  )
}

export default AdminLogo