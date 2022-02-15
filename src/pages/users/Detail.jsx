import React, { useState } from 'react'
import UserCourse from '../../components/UserCourse'
import './Detail.css'
import Undo from '../../assets/undo.png'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Detail = ({ setDisabledLogo }) => {
  const [goBack, setGoBack] = useState(false);
  return (
    
    <motion.div
      style={{position:'absolute', width: '100%'}}
      initial={{ opacity: 0, x: '25%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={goBack ? null : { opacity: 0, x: '25%' }}
      transition={{duration: 1 }}
      className='detail_container'>
        <Link to ='/login'>
          <img className='detail_undo' src={Undo}></img>
        </Link>
      
        <Link to ='/'>
          <div className='detail_logo'>
            <motion.div
                transition={{ duration: 0.5 }}
                layoutId='logo'
            >
              <Logo/>
            </motion.div>
          </div>
        </Link>
        <div className='detail_wrapper'>
          <UserCourse name='น้องเจแปน' course='เตรียมสอบประถมต้น' course_status='ครบแล้ว' />
        </div>

        <div className='detail_wrapper'>
          <UserCourse name='น้องแมว' course='เตรียมสอบมัธยมต้น' course_status='เกิน 1 ชม'/>
        </div> 
        
      <Link onClick={() => { setGoBack(!goBack); setDisabledLogo(true); }} to ='/' style={{textDecoration:'none', color:'#000'}}>
        <motion.div
          // transition={{duration: 1 }}
          layoutId='log_button'
          className='detail_logout'
        >
          <Button type='logout' name='ลงชื่อออก'/>
        </motion.div>
        </Link>
    </motion.div>
  )
}

export default Detail

