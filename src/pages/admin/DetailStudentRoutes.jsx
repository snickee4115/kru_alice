import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Name from '../../components/Name'
import { AuthContext } from '../../context/auth'
import { db } from '../../firebase'
import './DetailStudentRoutes.css'

const DetailStudentRoutes = () => {
  const { stdid } = useParams();
  const { nameStudent, setNameStudent } = useContext(AuthContext);

  useEffect(() => {
    getDoc(doc(db, 'students', stdid)).then(docSnap => {
      setNameStudent(docSnap.data().name);
    })
  },[])
  return (
      <div className='detail_student_routes_container'>
        <div className="name_label">
        <Name name={nameStudent}/>
        </div>
        <Outlet/>
      </div>
  )
}

export default DetailStudentRoutes