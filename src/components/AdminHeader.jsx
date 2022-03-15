import React, { useContext } from 'react'
import AdminLogo from '../assets/admin_logo.png'
import HomeLogo from '../assets/home.png'
import './AdminHeader.css'
import UndoButton from '../assets/undo.png'
import {useNavigate} from 'react-router-dom'
import DataContext from '../data/DataContext'

const AdminHeader = ({ useUndo, useHome }) => {

  const navigate = useNavigate();
  const { uback } = useContext(DataContext);
  const setUndo = () => {
    
  }
  return (
    <div className='admin_header_container'>
        {/* <div><img src={UndoButton} /></div> */}
      {useHome ? 
        <div style={{ display: 'flex', justifyContent:'space-between', marginTop:'3%' }}>
          <div className={'home_img'}><img style={{cursor:'pointer'}} onClick={()=>navigate('/student_list')} src={HomeLogo} /></div>
          <div className='back_button_home'>
            {
              useUndo ?
                <img style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(uback)
                    // navigate(-1);
                  }}
                  src={UndoButton} />
                : null
            }
          </div>
      </div>
        :
        <>
          <div className='back_button'>{useUndo ? <img style={{cursor:'pointer'}} onClick={()=>navigate(-1)} src={UndoButton} /> : null}</div>
          <div className={'alogo_img'}><img style={{cursor:'pointer'}} onClick={()=>navigate('/student_list')} src={AdminLogo} /></div>
        </>
        }
        
    </div>
  )
}

export default AdminHeader