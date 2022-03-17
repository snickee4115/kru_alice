import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader'
import Button from '../../components/Button'
import { db } from '../../firebase'
import './EditTel.css'
import toast, { Toaster } from 'react-hot-toast';
import { async } from '@firebase/util'

const EditTel = () => {
    const { stdid } = useParams();
    const [ student, setStudent ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getDoc(doc(db, 'students', stdid)).then(docSnap => {
            if (docSnap.exists) {
                setStudent(docSnap.data());

            }
        });
        
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updataTel = updateDoc(doc(db, 'students', stdid), {
            tel: student.tel,
        });
        toast.promise(updataTel, {
            loading: 'กำลังดำเนิการแก้ไข',
            success: 'แก้ไขเบอร์โทรสำเร็จ',
            error: 'แก้ไขเบอร์โทรไม่สำเร็จ',
        }).then(()=> {
            navigate('/admin')
        })
    }
  return (
      <div className='edit_tel_container'>
            {/* <AdminHeader useUndo={true} /> */}
            <div className='edit_tel_text'>
                <p>แก้ไขเบอร์โทร</p>
            </div>
            <form onSubmit={handleSubmit} className="form_edit_tel">
                <div className='own_of_tel'>{student.name}</div>
                <input value={student.tel} onChange={(e)=>setStudent({...student, tel:e.target.value})} type="number" />
                <Button name="ยืนยัน" type='ok'></Button>
            </form>
            <Toaster />
      </div>
  )
}

export default EditTel