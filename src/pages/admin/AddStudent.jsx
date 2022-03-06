import { addDoc, collection, doc, getDoc, orderBy, query, updateDoc, Timestamp, onSnapshot, limit } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { auth, db } from '../../firebase'
import './AddStudent.css'

const AddStudent = () => {

    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState({
        name: '',
        tel: '',
        course: '',
    });

    const { name, tel, course } = dataUser;
    const handleChange = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    const [stdID, setStdID] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "students"), {
            adminID: auth.currentUser.uid,
            name: name,
            tel: tel,
            course: [course],
            createAt: Timestamp.fromDate(new Date()),
        })

        const q = query(collection(db, 'students'), orderBy('createAt', 'desc'), limit(1));
        let id;
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach(async e => {
                // setStdID(e.id)
                // id = e.id;
                // console.log(id)
                await addDoc(collection(db, "courses"), {
                    ownerCourseID: e.id,
                    cName: course,
                    sumHours: 0,
                    createAt: Timestamp.fromDate(new Date()),
                })
            });
        })
        // console.log(stdID);

        
     
        setDataUser({
            name: '',
            tel: '',
            course: '',
        });
        console.log("success")
        // navigate('/student_list')
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
      </div>
  )
}

export default AddStudent