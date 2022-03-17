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
  // const [titleCourse, setTitleCourse] = useState();
  const [dataCourse, setDataCourse] = useState({ titleCourse: '', detailCourse: '' });
  const { titleCourse, detailCourse } = dataCourse;

  useEffect(() => {
    getDoc(doc(db, 'students', stdid, 'courses', courseid)).then(docSnap => {
      if (docSnap.exists) {
        setDataCourse({titleCourse: docSnap.data().courseName, detailCourse: docSnap.data().detail})
      }
    })

  }, [])

  const handleChange = (e) => {
    setDataCourse({...dataCourse, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titleCourse) {
      
    } else {
      const updateCourse = updateDoc(doc(db, 'students', stdid, 'courses', courseid), {
        courseName: titleCourse,
        detail: detailCourse
      })
      toast.promise(updateCourse, {
        loading: 'กำลังดำเนินการแก้ไข',
        success: 'แก้ไขชื่อคอร์สสำเร็จ',
        error: 'แก้ไขชื่อคอร์สไม่สำเร็จ'
      })
      
    }
  }
  



  return (
    <div className='edit_course_container'>
            <div className='edit_course_text'>
                <p>เปลี่ยนชื่อคอร์ส</p>
            </div>
            <form onSubmit={handleSubmit} className="form_edit_course">
                <div className='title_form_edit_course'>ชื่อคอร์ส</div>
                <input name='titleCourse' onChange={handleChange} value={titleCourse} type="text" />
                <div className='edit_course_text'>รายละเอียดคอร์ส</div>
                <textarea 
                    type="text" 
                    name='detailCourse'
                    value={detailCourse}
                    onChange={handleChange}
                    placeholder={'เรียนวันพฤหัส 17.30 - 19.30 น. \nคอร์สที่ 2 : เรียน 10 ครั้ง 2000 บาท'}/>
                <Button name="ยืนยัน" type='ok'></Button>
            </form>
            <Toaster />
      </div>
  )
}

export default EditCourseTitle