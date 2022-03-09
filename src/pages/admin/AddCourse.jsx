import React, { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Name from '../../components/Name'
import './AddCourse.css'
import PopUp from '../../components/PopUp'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { async } from '@firebase/util'
import toast, { Toaster } from 'react-hot-toast';
import { addDoc, collection, Timestamp } from 'firebase/firestore'
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
  const { moreHours } = useContext(AuthContext);

  useEffect(() => {
    console.log(stdid)
    // if (!state) {
    //   // navigate('/student_list');
    //   // console.log("objectzzzz");
    // }
  }, []);
  
  const handleChange = (e) => {
    setDataCourse({ ...dataCourse, [e.target.name]: e.target.value });
  }

  
  const handleSubmit = async (e) => {
    await addDoc(collection(db, 'students', stdid, 'courses'), {
      ownerCourseID: stdid,
      courseName: dataCourse.courseName,
      sumHours: 0,
      detail:dataCourse.courseDetail,
      createAt: Timestamp.fromDate(new Date()),
    })
    toast.success('บันทึกข้อมูลสำเร็จ');
    setDataCourse({courseName:'', courseDetail:''});

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
                              <div>เตรียมสอบมัธยมปลาย</div>
                              <div>ให้กับ น้องแมว ?</div>
                          </div>
                          ] : 
                          <div>
                              <div>มีเวลาค้างอยู่ในระบบ {parseInt(moreHours)} ชม. {(parseInt(moreHours*10))%10*6} นาที</div>
                              <div>ต้องการให้ลงในคอร์สใหม่หรือไม่ ?</div>
                          </div>
                        }
                      ok='ยืนยัน'
                      cancel='ยกเลิก'
                      onCancel={() => { setPopUp1(false); setPopUp2(false)}}
                      typeButton='button'
                      onOk={() => {
                        if (popUp1) {
                          if (moreHours <= 0) {
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
      {/* {popUp1 || popUp2 ?
        <PopUp
          content={popUp1 ?
              [
              <div>
                  <div>ต้องการเพิ่มคอร์สชื่อ</div>
                  <div>เตรียมสอบมัธยมปลาย</div>
                  <div>ให้กับ น้องแมว ?</div>
              </div>
              ] : 
              <div>
                  <div>มีเวลาค้างอยู่ในระบบ 1 ชม.</div>
                  <div>ต้องการให้ลงในคอร์สใหม่หรือไม่ ?</div>
              </div>
            }
          ok='ยืนยัน'
          cancel='ยกเลิก'
          onCancel={() => { setPopUp1(false); setPopUp2(false)}}
          onOk={() => {
            if (popUp1) {
              setPopUp1(false);
              setPopUp2(true);
            } else if (popUp2) {
              // setPopUp2(false);
              handleSubmit();
            }
          }}
        />
          : null
          } */}
    </div>
  )
}

export default AddCourse