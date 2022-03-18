import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Name from '../../components/Name'
import { AuthContext } from '../../context/auth'
import DataContext from '../../data/DataContext'
import { db } from '../../firebase'
import './DetailStudentRoutes.css'

const DetailStudentRoutes = () => {
  const { stdid } = useParams();
  const { nameStudent, setNameStudent, setStdid } = useContext(AuthContext);
  const { home } = useContext(DataContext);
  const { setLoading, loading } = useContext(DataContext);

  useEffect(async () => {
    await setStdid(stdid);
    await getDoc(doc(db, 'students', stdid)).then(docSnap => {
      setNameStudent(docSnap.data().name);
    })

  },[])
  return (
      <div className={!loading ? home ? 'detail_student_routes_container_home' :'detail_student_routes_container' : null}>
        <div className={"name_label"}>
          {!loading ? <Name name={nameStudent} />: null}
        </div>
        <Outlet/>
      </div>
  )
}

export default DetailStudentRoutes