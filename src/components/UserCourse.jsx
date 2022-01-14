import React from 'react'
import './UserCourse.css'
import Cat from '../assets/cat.png'


const UserCourse = () => {
    return (
        <div className='cat_container'>
            <div className='student_name'>น้องเจแปน</div>
            
            <div className=''>COURSE</div>
            <div >
                เตรียมสอบอังกฤษประถมต้น
            </div>
            <div>
                เตรียมสอบอังกฤษประถมปลาย
            </div>
                      
            <img className='cat' src={Cat} ></img>
        </div>
    )
}

export default UserCourse
