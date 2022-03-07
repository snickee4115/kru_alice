import React, { useState } from 'react'
import UserCourse from '../../components/UserCourse'
import './Detail.css'
import Undo from '../../assets/undo.png'
import Cat from '../../assets/cat.png'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'



const dek = [
            {name:'น้องเจแปน',coe:'คอสเรียนประถมต้น',tre:"เกิน 1 ชม"},
            {name:'น้องแมว',coe:'คอสเรียนมัธยมต้น',tre:"เหลือ 1 ชม."}
            ]

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
        
        {dek.map((value,index) =>
        <div className='detail_wrapper'>
            <div className='cat_container'>
              <div >
               <div className='student_name'>{value.name}</div>
               </div>
                <div className='type' >
                  COURSE
                </div>
            <div className='type'>
            <Link to ='/datalist'>
                {value.coe}
            </Link>
                <div> 
                  {value.tre}</div>


               </div >         
            <img className='cat' src={Cat} ></img>
            </div>
        </div>)
        }
        

        
        
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

