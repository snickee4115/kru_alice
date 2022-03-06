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
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '../../firebase'

const StudentList = () => {
    const {user} = useContext(AuthContext);
    const [popUp, setPopUp] = useState(false);
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [sp, setSp] = useState('');
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

    const handleDelete = async (docid) => {
        await deleteDoc(doc(db, 'students', docid))
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
                        <div onClick={() => navigate('detail_student?'+student.name)}>{student.name}</div>
                        <img style={{cursor:'pointer'}} onClick={()=>{toggleModal();setSp(student);}} src={Bin} alt="" />
                    </span>
                    <span>
                        <div>{student.tel}</div>
                        <img onClick={()=> navigate('edit_tel?'+student.name)} style={{cursor:'pointer'}} src={Edit} alt="" />
                    </span>
                    {popUp ?
                        <PopUp
                              onOk={() => { handleDelete(sp.docid);setPopUp(!popUp); }}
                                onCancel={() => { setPopUp(!popUp); console.log(sp)}}
                                content={'ยืนยันการลบ '+sp.name+' ?'}
                                ok='ยืนยัน'
                                cancel= 'ยกเลิก'
                        />
                        : null}
                </div>
              )}
        </div>
 
              {/* <Button name="เพิ่มนักเรียน" /> */}

          <div className='foot_student_list'>
              <Button to='add_student' type='add' name="เพิ่มนักเรียน" />
              <Button to='/admin_login' type='logout' name="Log out" />
          </div>

    </div>
  )
}

export default StudentList
