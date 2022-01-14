import React from 'react'
import UserCourse from '../../components/UserCourse'
import './Detail.css'
import Undo from '../../assets/undo.png'



const Detail = () => {
  return (
    
    <div className='detail_container'>
      <img className='undo' src={Undo} ></img>


      
      <div className='detail_wrapper'>
        <UserCourse/>
      </div>
      <div className='detail_wrapper'>
        <UserCourse/>
      </div>

    </div>
  )
}

export default Detail

