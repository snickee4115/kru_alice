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
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, where, writeBatch } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import toast, { Toaster } from 'react-hot-toast';

const StudentList = () => {
    const {user} = useContext(AuthContext);
    const [popUp, setPopUp] = useState(false);
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [stdPopUp, setstdPopUp] = useState('');
    const { setUndo } = useContext(DataContext);

    const toggleModal = () => {
        setPopUp(!popUp);
    }
    useEffect(() => {
        setUndo(false);

        // console.log(auth);
        // console.log(authID);
        // const timer = setTimeout(() => {
        //     console.log('This will run after 1 second!')
        //     const q = query(collection(db, 'students'), where("adminID", "==", user.uid), orderBy('tel'));
        //     const unsub = onSnapshot(q, (querySnapshot) => {
        //         let std = [];
        //         let index = 0;
        //         querySnapshot.forEach((doc) => {
                    
                    // std.push(doc.data());
                    // std[index].docid = doc.id;
                    // console.log(std[index].sid);
                    // index = index + 1;
                    
                    
        //         });
        //         setStudents(std);
        //     })
        //     return () => unsub();
        // }, );

        // await waitAuth();
        
        if (user) {
            const q = query(collection(db, 'students'), where("adminID", "==", user.uid), orderBy('tel'));
            const unsub = onSnapshot(q, (querySnapshot) => {
                let std = [];
                let index = 0;
                querySnapshot.forEach((doc) => {
                    std.push(doc.data());
                    std[index].docid = doc.id;
                    index = index + 1;
                });
                setStudents(std);
        })
        return () => unsub();}


    }, [user])

    const handleDelete = async (stdPopUp) => {
        const batch = writeBatch(db);
        
        // await deleteDoc(doc(db, 'students', stdPopUp.docid));

        const q1 = await getDocs(collection(db, 'students', stdPopUp.docid, 'courses'));
        q1.forEach(async (docSnap) => {
            // await batch.delete(doc(db, "students", stdPopUp.docid, "courses", docSnap.id));
            await deleteDoc(doc(db, "students", stdPopUp.docid, "courses", docSnap.id));
            console.log(docSnap.id);
        })

        // await batch.delete(doc(db, 'students', stdPopUp.docid));
        await deleteDoc(doc(db, 'students', stdPopUp.docid));

        // await batch.commit();
        


        toast.success('ลบข้อมูล '+stdPopUp.name+' สำเร็จ');
    }
    
    // const studentss = [
    //     {
    //         "name": "น้อง แมว",
    //         "tel": "0847548568"
    //     },
    //     {
    //         "name": "น้อง Japan",
    //         "tel": "0847548568"
    //     },
    //     {
    //         "name": "น้อง ปอร์น",
    //         "tel": "0824356485"
    //     }
    // ]

  return (
    <div className='student_list_container'>
        {/* <AdminHeader useUndo={true}/> */}
          <div className='hi_alice'>
              <p>สวัสดีครู <span>อลิส</span></p>
          </div>
        <div className="student_detail">
              {students.map((student, index) => 
                <div key={index}>
                    <span>
                        <div onClick={() => navigate('detail_student/'+student.docid)}>{student.name}</div>
                        <img style={{cursor:'pointer'}} onClick={()=>{toggleModal();setstdPopUp(student);}} src={Bin} alt="" />
                    </span>
                    <span>
                        <div>{student.tel}</div>
                        <img onClick={()=> navigate('edit_tel/'+student.docid)} style={{cursor:'pointer'}} src={Edit} alt="" />
                    </span>
                    
                </div>
              )}
        </div>
        {popUp ?
            <PopUp
                    onOk={() => { handleDelete(stdPopUp);setPopUp(!popUp); }}
                    onCancel={() => { setPopUp(!popUp)}}
                  content={[<div>ยืนยันการลบ <div style={{ display: 'inline-block' }}>{stdPopUp.name}</div></div>]}
                    ok='ยืนยัน'
                    cancel= 'ยกเลิก'
            />
            : null}
              {/* <Button name="เพิ่มนักเรียน" /> */}

          <div className='foot_student_list'>
              <Button to='add_student' type='add' name="เพิ่มนักเรียน" />
              <Button to='/admin_login' type='logout' name="Log out" />
          </div>
          <Toaster />
    </div>
  )
}

export default StudentList
