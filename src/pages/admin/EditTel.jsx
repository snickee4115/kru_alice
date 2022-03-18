import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader'
import Button from '../../components/Button'
import { db } from '../../firebase'
import './EditTel.css'
import toast, { Toaster } from 'react-hot-toast';
import { async } from '@firebase/util'
import DataContext from '../../data/DataContext'
import Loading from '../../components/Loading'

const EditTel = () => {
    const { stdid } = useParams();
    const [student, setStudent] = useState({ name: '', tel: '' });
    const { name, tel } = student;
    const navigate = useNavigate();
    const { setLoading, loading } = useContext(DataContext);
    

    useEffect(() => {
        getDoc(doc(db, 'students', stdid)).then(docSnap => {
            if (docSnap.exists) {
                setStudent(docSnap.data());

            }
        }).then(() => {
            setTimeout(() => {
                setLoading(false);;
            }, 500);
        })
        
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !tel) {
            toast.error('กรุณากรอกข้อมูลให้ครบ')
        } else if (!tel.match('[0]{1}[0-9]{8,9}')) {
            toast.error('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
        } else {
            const updataTel = updateDoc(doc(db, 'students', stdid), {
            name: student.name,
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
        
    }
    if (loading) {
        return <Loading/>
      }
  return (
      <div className='edit_tel_container'>
            {/* <AdminHeader useUndo={true} /> */}
            <div className='edit_tel_text'>
                <p>แก้ไขข้อมูลนักเรียน</p>
            </div>
            <form onSubmit={handleSubmit} className="form_edit_tel">
                <div>ชื่อ</div>
                <input name='name' placeholder='น้องกี้' value={name} 
                  onChange={(e) => setStudent({ ...student, name:e.target.value })}
                  type="text" 
              />
              
                <div>เบอร์โทรศัพท์มือถือ</div>
                <input value={tel}
                    onChange={(e) => {
                        if (e.target.value.length <= 10) {
                            setStudent({ ...student, tel: e.target.value })
                        }
                        
                    }}
                    type="number"
                />
                <Button name="ยืนยัน" type='ok'></Button>
            </form>
            <Toaster />
      </div>
  )
}

export default EditTel