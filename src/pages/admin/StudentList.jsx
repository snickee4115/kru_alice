import React, { useContext, useEffect, useState } from 'react'
import AdminLogo from '../../assets/admin_logo.png'
import AdminHeader from '../../components/AdminHeader'
import './StudentList.css'
import Bin from '../../assets/bin.png'
import Edit from '../../assets/edit.png'
import Button from '../../components/Button'
import PopUp from '../../components/PopUp'
import { Link, useNavigate } from 'react-router-dom'
import DataContext from '../../data/DataContext'
import { AuthContext } from '../../context/auth'
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, where, writeBatch } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import toast, { Toaster } from 'react-hot-toast';
import { signOut } from 'firebase/auth'
import Loading from '../../components/Loading'

const StudentList = () => {
    const {setUser, user } = useContext(AuthContext);
    const [popUp, setPopUp] = useState(false);
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [stdPopUp, setstdPopUp] = useState('');
    const { setUndo } = useContext(DataContext);
    const { setNameStudent } = useContext(AuthContext);
    // const [loading, setLoading] = useState(true);
    const [nameAdmin, setNameAdmin] = useState('');
    const { setLoading, loading } = useContext(DataContext);

    const toggleModal = () => {
        setPopUp(!popUp);
    }

    useEffect(async () => {
        
       
        
            setUndo(false);
            setNameStudent('');
            const getNameAdmin = (await getDoc(doc(db, 'admin', user.uid))).data().name;
            setNameAdmin(getNameAdmin);
            
      
            
        // return () => {
        //     // unsub()
        //     unsub();
        //     setPopUp(false);
        //     setStudents([])
        //     setstdPopUp('')
        //     setUndo(true)
        //     setNameStudent()
        //     setNameAdmin('')
        // };
        
        


    }, [user])

    useEffect(() => {
        const q = query(collection(db, 'students'), orderBy('tel'));
      const unsub =onSnapshot(q, (querySnapshot) => {
        let std = [];
        let index = 0;
        querySnapshot.forEach((doc) => {
            std.push(doc.data());
            std[index].docid = doc.id;
            index = index + 1;
        });
        setStudents(std);
        setTimeout(() => {
            setLoading(false);;
        }, 500);
            
    })
      return () => unsub();
    }, [])
    

    const handleDelete = async (stdPopUp) => {

        const q1 = await getDocs(collection(db, 'students', stdPopUp.docid, 'courses'));
        q1.forEach(async (docSnap) => {
            await deleteDoc(doc(db, "students", stdPopUp.docid, "courses", docSnap.id));

        })

        const deleteStudent = deleteDoc(doc(db, 'students', stdPopUp.docid));


        toast.promise(deleteStudent, {
            loading: 'กำลังลบข้อมูล',
            success: 'ลบข้อมูล ' + stdPopUp.name + ' สำเร็จ',
            error: 'ลบข้อมูลไม่สำเร็จ'
        })

    }

    const handleSingOut = async () => {

        const onSignOut = new Promise((resolve) => {
            setTimeout(() => {
                signOut(auth);
                resolve();
            }, 1000);

        })
        toast.promise(onSignOut, {
            loading: 'กำลังออกจากระบบ',
            success: 'ออกจากระบบสำเร็จ',
            error: 'ออกจากระบบไม่สำเร็จ'
        })

    }

    if (loading) {
        return <Loading/>
      }

    return (
        <div className='student_list_container'>
            {/* <AdminHeader useUndo={true}/> */}
            <div className='hi_alice'>
                <p>สวัสดีครู <span>{nameAdmin}</span></p>
            </div>
            <div className="student_detail">
                {students.map((student, index) =>
                    <div key={index}>
                        <span>
                            <div onClick={() => navigate('detail_student/' + student.docid)}>{student.name}</div>
                            <div style={{ cursor: 'unset' }}>
                                <img style={{ cursor: 'pointer' }} onClick={() => { toggleModal(); setstdPopUp(student); }} src={Bin} alt="" />
                            </div>
                        </span>
                        <span>
                            <div>{student.tel}</div>
                            <div>
                                <img onClick={() => navigate('edit_tel/' + student.docid)} style={{ cursor: 'pointer' }} src={Edit} alt="" />
                            </div>
                        </span>

                    </div>
                )}
            </div>
            {popUp ?
                <PopUp
                    onOk={() => { handleDelete(stdPopUp); setPopUp(!popUp); }}
                    onCancel={() => { setPopUp(!popUp) }}
                    content={[<div key={'key'}>ยืนยันการลบ <div style={{ display: 'inline-block' }}>{stdPopUp.name}</div></div>]}
                    ok='ยืนยัน'
                    cancel='ยกเลิก'
                />
                : null}
            {/* <Button name="เพิ่มนักเรียน" /> */}

            <div className='foot_student_list'>
                <Button to='add_student' type='add' name="เพิ่มนักเรียน" />
                <Button onClick={handleSingOut} type='logout' name="Log out" />
            </div>
            <Toaster />
        </div>
    )
}

export default StudentList
