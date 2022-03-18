import { setDoc, addDoc, collection, doc, getDoc, orderBy, query, updateDoc, Timestamp, onSnapshot, limit } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, } from 'react-router-dom'
import Button from '../../components/Button'
import { auth, db } from '../../firebase'
import './AddStudent.css'
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
import DataContext from '../../data/DataContext'
import Loading from '../../components/Loading'

const AddStudent = () => {
    const { setLoading, loading } = useContext(DataContext);
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState({
        name: 'น้อง',
        tel: '',
        course: 'เตรียมสอบ',
        detail:'เรียนวันพฤหัส 17.30 - 19.30 น. \nคอร์สที่ 2 : เรียน 10 ครั้ง 2000 บาท',
        error: null,
    });

    const { name, tel, course, error,detail } = dataUser;
    const handleChange = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    const [stdID, setStdID] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);;
        }, 500);
    
      
    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDataUser({ ...dataUser, error: null })
        if (!name || !tel || !course) {
            toast.error('กรุณากรอกข้อมูลให้ครบ');
        } else if (!tel.match('[0]{1}[0-9]{8,9}')) {
            toast.error('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง');
        }else {
            let id = uuid().slice(0, 8);
            const addstd = setDoc(doc(db, "students", id), {
                adminID: auth.currentUser.uid,
                name: name,
                tel: tel,
                course: [course],
                createAt: Timestamp.fromDate(new Date()),
                overHours: { hours: 0, lastStamp: null }
            }).then(() => {
                addDoc(collection(db, 'students', id, "courses"), {
                    ownerCourseID: id,
                    courseName: course,
                    sumHours: Number(0),
                    detail: 'เรียนวันพฤหัส 17.30 - 19.30 น.\n คอร์สที่ 2 : เรียน 10 ครั้ง 2000 บาท',
                    createAt: Timestamp.fromDate(new Date()),
                    overHours: Number(0),
                    finished: null,
                    stamp: []
                })
            })

            toast.promise(addstd, {
                loading: 'กำลังดำเนินการ',
                success: 'เพิ่มข้อมูลนักเรียนสำเร็จ',
                error: 'เพิ่มข้อมูลนักเรียนไม่สำเร็จ'
            }).then(() => {
                setDataUser({
                    name: '',
                    tel: '',
                    course: '',
                    error: null,
                });
            })

        }

    };

    if (loading) {
        return <Loading/>
      }

    return (
        <div className='add_student_container'>
            <form onSubmit={handleSubmit} className="form_add_student">
                <div>ชื่อ</div>
                <input name='name' placeholder='น้องกี้' value={name} onChange={handleChange} type="text" />
                <div>เบอร์โทรศัพท์มือถือ</div>
                <input name='number' placeholder='0959618438' value={tel}
                    onChange={(e) => {
                        if (e.target.value.length <= 10) {
                            setDataUser({...dataUser, tel: e.target.value})
                        }
                    }}
                    // onKeyPress={(evt, regex) => {
                    //     var theEvent = evt || window.event;
                    //     if ('[0]{1}[0-9]{8,9}'.test(key)) {
                    //         theEvent.returnValue = false;
                    //         if (theEvent.preventDefault) theEvent.preventDefault();
                    //     }
                    // }}
                    type="number"
                />
                <div>ชื่อคอร์สแรก</div>
                <input name='course' placeholder='เตรียมสอบมัธยมปลาย' value={course} onChange={handleChange} type="text" />
                <div>รายละเอียดคอร์สแรก</div>
                <textarea 
                    type="text" 
                    name='detail'
                    value={detail}
                    onChange={handleChange}
                    placeholder={'เรียนวันพฤหัส 17.30 - 19.30 น.\n คอร์สที่ 2 : เรียน 10 ครั้ง 2000 บาท'}
                    />
                <Button name="ยืนยัน" type='ok'></Button>
            </form>

            <Toaster />

        </div>
    )
}

export default AddStudent