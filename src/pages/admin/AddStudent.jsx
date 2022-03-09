import { setDoc,addDoc, collection, doc, getDoc, orderBy, query, updateDoc, Timestamp, onSnapshot, limit } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate,  } from 'react-router-dom'
import Button from '../../components/Button'
import { auth, db } from '../../firebase'
import './AddStudent.css'
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuid } from 'uuid';

const AddStudent = () => {

    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState({
        name: '',
        tel: '',
        course: '',
        error: null,
    });
    
    const { name, tel, course, error} = dataUser;
    const handleChange = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    const [stdID, setStdID] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDataUser({...dataUser, error:null})
        if (!name || !tel || !course) { 
            toast.error('กรุณากรอกข้อมูลให้ครบ');
        }else{
            let id = uuid().slice(0, 8);
            const addstd = await setDoc(doc(db, "students", id), {
                adminID: auth.currentUser.uid,
                name: name,
                tel: tel,
                course: [course],
                createAt: Timestamp.fromDate(new Date()),
            })
            await addDoc(collection(db, 'students', id, "courses"), {
                ownerCourseID: id,
                courseName: course,
                sumHours: 0,
                detail:'',
                createAt: Timestamp.fromDate(new Date()),
            })
            setDataUser({
                name: '',
                tel: '',
                course: '',
                error: null,
            });
            notify();
            // navigate('/student_list');
        }
        
    };

    const notify = () => toast.success('บันทึกข้อมูลสำเร็จ');

  return (
      <div className='add_student_container'>
          <form onSubmit={handleSubmit} className="form_add_student">
              <div>ชื่อ</div>
              <input name='name' value={name} onChange={handleChange} type="text" />
              <div>เบอร์มือถือ</div>
              <input name='tel' value={tel} onChange={handleChange} type="number" />
              <div>ชื่อคอร์สแรก</div>
              <input name='course' value={course} onChange={handleChange} type="text" />
              {/* {error ?
                  <div style={{
                    display:'flex',
                    justifyContent:'center',
                    position: 'relative',
                    color: 'red',
                    fontSize: 'calc(1vw + 11px)',
                    top: '13px',

                }}>{error}</div>
                :
                <div style={{
                    position: 'relative',
                    color: 'red',
                    fontSize: 'calc(1vw + 11px)',
                    top: '13px',
                    visibility:'hidden'
                }}>ข้อความที่ซ่อน</div>} */}
              <Button name="ยืนยัน" type='ok'></Button>
          </form>
          
          <Toaster />
          
      </div>
  )
}

export default AddStudent