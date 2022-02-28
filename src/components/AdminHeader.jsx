import React from 'react'
import AdminLogo from '../assets/admin_logo.png'
import './AdminHeader.css'
import UndoButton from '../assets/undo.png'
import {useNavigate} from 'react-router-dom'

const AdminHeader = ({ useUndo }) => {

  const navigate = useNavigate();
  const setUndo = () => {
    
  }
  return (
    <div className='admin_header_container'>
        {/* <div><img src={UndoButton} /></div> */}
          <div className='back_button'>{useUndo ? <img style={{cursor:'pointer'}} onClick={()=>navigate(-1)} src={UndoButton} /> : null}</div>
        <div className='alogo_img'><img style={{cursor:'pointer'}} onClick={()=>navigate('/student_list')} src={AdminLogo} /></div>
    </div>
  )
}

export default AdminHeader