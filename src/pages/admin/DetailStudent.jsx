import React, { useContext, useEffect, useState } from 'react'
import './DetailStudent.css'
import Bin from '../../assets/bin.png'
import Edit from '../../assets/edit.png'
import Button from '../../components/Button'
import PopUp from '../../components/PopUp'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../context/auth'


const DetailStudent = () => {
  const [popUp, setPopUp] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { stdid } = useParams();
  const [listCourses, setListCourses]  = useState([]);

  useEffect( () => {
    const q =  query(collection(db, 'students', stdid, 'courses'));

     const unsub = onSnapshot(q, (querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((docSnap) => {
        temp.push(docSnap.data());
      })
      setListCourses(temp);
      console.log(listCourses);
     })
    return () => unsub();

  },[user])


  // const list_course = [
  //   { title: 'เตรียมสอบอังกฤษประถมต้น', hours:'9/10'},
  //   { title: 'เตรียมสอบอังกฤษประถมปลาย', hours:'5/10'},
  //   { title: 'เตรียมสอบอังกฤษมัธยมต้น', hours:'เกิน 1 hr. 0 Sec.'},

  // ]
  return (
      <div className='detail_student_container'>
      
          <div className='course_label_text'>COURSE</div>
          <div className="student_list_course">
            {listCourses.map((course,index) =>
                <div key={index} className='wrapper_student_course'>
                    <div>{course.cName}</div>
                    <div>
                      <img style={{cursor:'pointer'}} src={Bin} onClick={()=> setPopUp(!popUp)}/>
                      <img style={{cursor:'pointer'}} onClick={()=>navigate('edit_course_title')} src={Edit} />
                      <span style={{ color: course.sumHours.length > 5 ? '#D91919' : '#3C00E9' }}>{course.sumHours}/10</span>
                    </div>
                </div>
              )
            }
          </div>
          
      {popUp ? 
        <PopUp
          ok='ยืนยัน'
          cancel='ยกเลิก'
          onOk={() => { setPopUp(!popUp) }}
          onCancel={() => { setPopUp(!popUp) }}
          content={
            [
            <div>
                <div>ยืนยันการลบ</div>
                <div>เตรียมสอบอังกฤษประถมต้นหรือไม่ ?</div>
            </div>
            ]
          }
        />
          :null}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        // margin: '5% 0',
        marginBottom: 'calc(3vh + 5px)',
        marginTop: 'calc(1vh + 5px)',
        alignItems: 'center'
      }}>
            <div className='hours_over_text'>
              มีชั่วโมงที่เกินมาในระบบ 1 Hr. 0 Sec.
            </div>
            <Button to='add_course' name='เพิ่มคอร์ส' type='add'></Button>
          </div>
          
        
      </div>
  )
}

export default DetailStudent

const De = () => {
  return <div>
    asdasdzzzz
  </div>
  
}
