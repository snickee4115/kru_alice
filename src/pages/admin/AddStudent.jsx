import { setDoc, addDoc, collection, doc, getDoc, orderBy, query, updateDoc, Timestamp, onSnapshot, limit } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate, } from 'react-router-dom'
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

    const { name, tel, course, error } = dataUser;
    const handleChange = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    const [stdID, setStdID] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDataUser({ ...dataUser, error: null })
        if (!name || !tel || !course) {
            toast.error('กรุณากรอกข้อมูลให้ครบ');
        } else {
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
                    detail: '',
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



    return (
        <div className='add_student_container'>
            <form onSubmit={handleSubmit} className="form_add_student">
                <div>ชื่อ</div>
                <input name='name' value={name} onChange={handleChange} type="text" />
                <div>เบอร์มือถือ</div>
                <input name='tel' value={tel} onChange={handleChange} type="number" />
                <div>ชื่อคอร์สแรก</div>
                <input name='course' value={course} onChange={handleChange} type="text" />
            
                <Button name="ยืนยัน" type='ok'></Button>
            </form>

            <Toaster />

        </div>
    )
}

export default AddStudent