import React, { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Name from '../../components/Name'
import './AddCourse.css'
import PopUp from '../../components/PopUp'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { async } from '@firebase/util'
import toast, { Toaster } from 'react-hot-toast';
import { addDoc, collection, collectionGroup, deleteField, doc, FieldValue, getDocs, onSnapshot, orderBy, query, QuerySnapshot, startAt, Timestamp, updateDoc, where, writeBatch } from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../context/auth'

const AddCourse = () => {
  const [popUp1, setPopUp1] = useState(false);
  const [popUp2, setPopUp2] = useState(false);
  const { pathname } = useLocation();
  const stdid = pathname.split('/')[3];

  const navigate = useNavigate();
  const [dataCourse, setDataCourse] = useState({courseName:'', courseDetail:''});
  const { courseName, courseDetail } = dataCourse;
  const { nameStudent} = useContext(AuthContext);
  const [allOverHours, setAllOverHours] = useState();
  const [allCourse, setAllCourse] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'students', stdid), (docSnap) => {
      setAllOverHours(docSnap.data().overHours);

    })
    return () => unsub();
  }, []);
  
  const handleChange = (e) => {
    setDataCourse({ ...dataCourse, [e.target.name]: e.target.value });
  }

  
  const handleSubmit = async (e) => {

    
    
    const addCourse = addDoc(collection(db, 'students', stdid, 'courses'), {
      ownerCourseID: stdid,
      courseName: dataCourse.courseName,
      sumHours: allOverHours.hours ? Number(allOverHours.hours) : Number(0),
      detail:dataCourse.courseDetail,
      createAt: Timestamp.fromDate(new Date()),
      overHours: allOverHours.hours > 10 ? Number(allOverHours.hours - 10) : Number(0),
      finished:null,
      stamp: allOverHours.hours && [{
        hours: allOverHours.hours,
        date: allOverHours.lastStamp,
        status: false
      }]
      
    }).then(async () => {
      if (allOverHours.hours) {
        
        const q = query(collection(db, 'students', stdid, 'courses'), where('overHours', '>', 0));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docSnap) => {
          if (!docSnap.data().finished) {
            updateDoc(doc(db, 'students', stdid, 'courses', docSnap.id), {
              finished: Timestamp.fromDate(new Date()),
            })
          }
        });
       
        updateDoc(doc(db, 'students', stdid), {
          overHours: {hours: 0, lastStamp: null},
        })
        return () => unsub();
      }
    })

    toast.promise(addCourse, {
      loading: 'กำลังดำเนินการ',
      success: 'เพิ่มข้อมูลคอร์สสำเร็จ',
      error: 'เพิ่มข้อมูลคอร์สไม่สำเร็จ'
    }).then(() => {
      setDataCourse({courseName:'', courseDetail:''});
  })
    

  }

  return (
    <div className='add_course_container'>
            
            <form className="form_add_course">
                
                <div>ชื่อคอร์ส</div>
                <input
                    type="text" 
                    name='courseName'
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    value={courseName}
                    onChange={handleChange}
                    placeholder={'เตรียมสอบภาษาอังกฤษมัธยมปลาย'}
                />
                <div>รายละเอียดคอร์ส</div>
                <textarea 
                    type="text" 
                    name='courseDetail'
                    value={courseDetail}
                    onChange={handleChange}
                    placeholder={'เรียนวันพฤหัส 17.30 - 19.30 น. \nคอร์สที่ 2 : เรียน 10 ครั้ง 2000 บาท'}/>
                <Button 
                  onClick={()=>!courseName ? toast.error('กรุณากรอกชื่อคอร์ส') :setPopUp1(!popUp1)}  
                  name="ยืนยัน" 
                  type='ok'
                  typeButton='button'
                  ></Button>
                  
                  {popUp1 || popUp2 ?
                    <PopUp
                      content={popUp1 ?
                          [
                          <div>
                              <div>ต้องการเพิ่มคอร์สชื่อ</div>
                              <div>{courseName}</div>
                              <div>ให้กับ {nameStudent} ?</div>
                          </div>
                          ] : 
                          <div>
                              <div>มีเวลาค้างอยู่ในระบบ {parseInt(allOverHours.hours)} ชม. {Math.round((allOverHours.hours*60)-parseInt(allOverHours.hours)*60)} นาที</div>
                              <div>ต้องการให้ลงในคอร์สใหม่หรือไม่ ?</div>
                          </div>
                        }
                      ok='ยืนยัน'
                      cancel='ยกเลิก'
                      onCancel={() => { setPopUp1(false); setPopUp2(false)}}
                      typeButton='button'
                      onOk={() => {
                        if (popUp1) {
                          if (!allOverHours.hours) {
                            setPopUp1(false);
                            handleSubmit();
                          } else {
                            setPopUp1(false);
                            setPopUp2(true);
                          }
                          
                        } else if (popUp2) {
                          setPopUp2(false);
                          handleSubmit();
                        }
                      }}
                    />
                      : null
                      }
            </form>
            <Toaster />
  
    </div>
  )
}

export default AddCourse