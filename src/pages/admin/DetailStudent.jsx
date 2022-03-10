import React, { useContext, useEffect, useState } from 'react'
import './DetailStudent.css'
import Bin from '../../assets/bin.png'
import Edit from '../../assets/edit.png'
import Button from '../../components/Button'
import PopUp from '../../components/PopUp'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../context/auth'
import toast, { Toaster } from 'react-hot-toast';


const DetailStudent = () => {
  const [popUp, setPopUp] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { stdid } = useParams();
  const [listCourses, setListCourses] = useState([]);
  const [coursePopUp, setCoursePopUp] = useState();
  // const [moreHours, setMoreHours] = useState();
  const { moreHours, setMoreHours } = useContext(AuthContext);

  useEffect( () => {
    const q =  query(collection(db, 'students', stdid, 'courses'), orderBy('courseName', 'asc'));

     const unsub = onSnapshot(q, (querySnapshot) => {
      let temp = [];
       let sumMoreHours = 0;
      querySnapshot.forEach((docSnap) => {
        temp.push(docSnap);
        if (docSnap.data().sumHours > 10) {
          sumMoreHours = sumMoreHours + (docSnap.data().sumHours-10);
        }
      })
       setMoreHours(sumMoreHours);
      setListCourses(temp);
      console.log(listCourses);
     })
    return () => unsub();

  }, [user])
  
  const handleDelete = async (coursePopUp) =>{
    await deleteDoc(doc(db, 'students', stdid, 'courses', coursePopUp.id));
    toast.success('ลบคอร์ส '+coursePopUp.data().courseName+' สำเร็จ');
  }


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
                    <div>{course.data().courseName}</div>
                    <div>
                  <img style={{ cursor: 'pointer' }} src={Bin} onClick={() => { setPopUp(!popUp);setCoursePopUp(course)}}/>
                      <img style={{cursor:'pointer'}} onClick={()=>navigate('edit_course_title/'+course.id)} src={Edit} />
                      <span style={{ color: course.data().sumHours > 10 ? '#D91919' : '#3C00E9' }}>
                      { course.data().sumHours <= 10 ?
                        <span>{course.data().sumHours}/10 hr.</span>
                        :
                      <span>เกิน {parseInt(course.data().sumHours - 10) } hr. {Math.round(((((course.data().sumHours) - 10)*10))%10*6)} minute.</span>
                        }
                      </span>
                    </div>
                </div>
              )
            }
          </div>
          
      {popUp ? 
        <PopUp
          ok='ยืนยัน'
          cancel='ยกเลิก'
          onOk={() => { handleDelete(coursePopUp); setPopUp(!popUp); }}
          onCancel={() => { setPopUp(!popUp) }}
          content={
            [
            <div>
                <div>ยืนยันการลบ</div>
                <div>{coursePopUp.data().courseName} หรือไม่ ?</div>
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
        {moreHours ? <div className='hours_over_text'>
              มีชั่วโมงที่เกินมาในระบบ {parseInt(moreHours)} Hr. {(parseInt(moreHours*10))%10*6} minute.
            </div>:<div className='hours_over_text'></div>}
            <Button to='add_course' name='เพิ่มคอร์ส' type='add'></Button>
          </div>
          
          <Toaster />
      </div>
  )
}

export default DetailStudent

