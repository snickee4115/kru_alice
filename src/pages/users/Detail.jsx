import React from 'react'
import UserCourse from '../../components/UserCourse'
import './Detail.css'
import Undo from '../../assets/undo.png'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { Link } from 'react-router-dom'

const Detail = () => {
  return (
    
    <div className='detail_container'>
      <Link to ='/login'>
      <img className='detail_undo' src={Undo}></img>
      </Link>
    
      <Link to ='/'>
        <div className='detail_logo'>
          <Logo/>
        </div>
      </Link>
       <div className='detail_wrapper'>
        <UserCourse name='น้องเจแปน' course='เตรียมสอบประถมต้น' course_status='ครบแล้ว' />
      </div>

      <div className='detail_wrapper'>
        <UserCourse name='น้องแมว' course='เตรียมสอบมัธยมต้น' course_status='เกิน 1 ชม'/>
      </div> 
      
      <Link to ='/'>
      <div  className='detail_logout'>
        <Button name='ลงชื่อออก'/>
      </div>
      </Link>
    </div>
  )
}

export default Detail

