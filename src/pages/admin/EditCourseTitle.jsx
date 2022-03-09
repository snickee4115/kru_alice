import { async } from '@firebase/util';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Button from '../../components/Button'
import { db } from '../../firebase';
import './EditCourseTitle.css'
import toast, { Toaster } from 'react-hot-toast';

const EditCourseTitle = () => {
  const [course, setCourse] = useState("เตรียมสอบภาษาอังกฤษมัธยมปลาย");
  const { pathname } = useLocation();
  const stdid = pathname.split('/')[3];
  const { courseid } = useParams();
  const [ titleCourse, setTitleCourse ] = useState();

  useEffect(() => {
    getDoc(doc(db, 'students', stdid, 'courses', courseid)).then(docSnap => {
      if (docSnap.exists) {
        setTitleCourse(docSnap.data().courseName);
      }
    })
    
    console.log(titleCourse);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titleCourse) {
      
    } else {
      await updateDoc(doc(db, 'students', stdid, 'courses', courseid), {
        courseName: titleCourse,
      })
      toast.success('แก้ไขชื่อคอร์สสำเร็จ');
      
    }
  }
  



  return (
    <div className='edit_course_container'>
            <div className='edit_course_text'>
                <p>เปลี่ยนชื่อคอร์ส</p>
            </div>
            <form onSubmit={handleSubmit} className="form_edit_course">
                <div className='title_form_edit_course'>ชื่อคอร์ส</div>
                <input onChange={(e)=>setTitleCourse(e.target.value)} value={titleCourse} type="text" />
                <Button name="ยืนยัน" type='ok'></Button>
            </form>
            <Toaster />
      </div>
  )
}

export default EditCourseTitle