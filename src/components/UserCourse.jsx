import React from 'react'
import './UserCourse.css'
import Cat from '../assets/cat.png'


const UserCourse = ({name,course,course_status}) => {
    return (
        <div className='cat_container'>
            <div >
            <div className='student_name'>{name}</div>
            </div>
            <div className='type' >COURSE</div>
            <div className='type'>
                {course}<div>{course_status}</div>
            </div >
          
                      
            <img className='cat' src={Cat} ></img>
        </div>
    )
}

export default UserCourse
