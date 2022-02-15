import React from 'react'
import AdminLogo from '../assets/admin_logo.png'
import './AdminHeader.css'
import UndoButton from '../assets/undo.png'

const AdminHeader = ({useUndo}) => {
  return (
    <div className='admin_header_container'>
        {/* <div><img src={UndoButton} /></div> */}
          <div className='back_button'>{useUndo ? <img src={UndoButton} /> : null}</div>
        <div className='alogo_img'><img src={AdminLogo} /></div>
    </div>
  )
}

export default AdminHeader