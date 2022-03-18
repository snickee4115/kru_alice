import React, { useEffect, useState } from 'react'
import './Detail.css'
import Undo from '../../assets/undo.png'
import Cat from '../../assets/cat.png'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast';
import { collection, getDocs, query, QuerySnapshot, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { async } from '@firebase/util'
import { AuthContext } from '../../context/auth'
import Name from '../../components/Name'
import Loading from '../../components/Loading'




const Detail = ({ setDisabledLogo }) => {
  const navigate = useNavigate();
  const [goBack, setGoBack] = useState(false);
  const ab = "  "
  const [studentList, setStudetList] = useState([{
    id: '', name: '',
    courses: [],
    hours: []
  }]);

  const [loading, setLoading] = useState(true);
  
  

  const {telstd} = useParams();

  useEffect(async () => {
    let std = [];
    new Promise(async (resolve) => {
      const q = await query(collection(db, 'students'), where('tel', '==', telstd));

      (await getDocs(q)).forEach(async (docSnap) => {
        await std.push({
          id: docSnap.id,
          name: docSnap.data().name,
          courses: [],
          hours: [],
        })
      })

      resolve(std)
    }).then(async (std) => {
      let index = 0;
      for (let i = 0; i < std.length; i++) {
        const q = query(collection(db, 'students', std[i].id, 'courses'));
        (await getDocs(q)).forEach(async (docSnap) => {
          
          std[i].courses.push(docSnap);

        });
      }
      setStudetList(std);
      
    }).then((std) => {
      setLoading(false);
    })

   
  }, [])
  if (loading) {
    return <Loading/>
  } 
  return (
  
    <motion.div
      style={{ position: 'absolute', width: '100%' }}
      initial={{ opacity: 0, x: '25%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={goBack ? null : { opacity: 0, x: '25%' }}
      transition={{ duration: 1 }}
      className='detail_container'>


        <div style={{
        // border:'solid 3px',
        alignItems:'center',
        marginTop:'7%',
        display:'flex',
        justifyContent:'space-between',}}>
      <Link style={{ textDecoration:'none'}} to='/'>
        <div className='detail_logo'>
          <motion.div
            transition={{ duration: 0.5 }}
            layoutId='logo'
          >
            <Logo />
          </motion.div>
        </div>
      </Link>
      <Link to='/login'>
        <img  className='detail_undo' src={Undo}></img>
      </Link>
      </div>
     
      <div className='emty'></div>

      {studentList.map((student, index) =>
        <div key={index} className='detail_wrapper'>

          <div className='cat_container'>

            <div style={{
              display:'flex',
            justifyContent:'space-between',
            position:'relative'
            }}>
              <Name name={student.name}/>
              <img className='catty' style={{marginTop:'-6%',marginRight:'-3.5%'}} src={Cat} ></img>
            </div>
            
            <div className='detail_type' >
              COURSE
            </div>
            <div className='detail_type'>
              {student.courses.map((course, index) =>
                <div className='remaint' key={index}>
                  <div style={{
                    // border: '1px solid',
                    flex: '4',
                  }}>
                    <div
                      onClick={()=>{navigate('datalist/stdid='+student.id+'?courseid='+course.id);}}
                      style={{
                      cursor: 'pointer',
                      display: 'inline-block',
                      wordBreak: 'break-all'
                    }}>{course.data().courseName}</div>
                  </div>
                  <div style={{
                    // display:'inline-flex',
                    // border: '1px solid',
                    flex: 
                      course.data().overHours ?
                      course.data().finished ?
                        '3'
                        :
                        '3'
                      :
                      '3'
                    ,
                    textAlign:'center',
                    color:
                      course.data().overHours ?
                        course.data().finished ?
                          '#986363'
                          :
                          '#D91919'
                        :
                        '#3C00E9'

                  }} >
                    {
                      course.data().overHours ?
                        course.data().finished ?
                          <span>ครบแล้ว</span>
                          :
                          <span>
                            {"เกิน " +
                              parseInt(course.data().overHours) +
                              " ชม. " +
                              Math.round(
                                course.data().overHours * 60 -
                                parseInt(course.data().overHours) * 60
                              ) +
                              " นาที"}
                          </span>
                        :
                        <span>{course.data().sumHours}/10 hr.</span>
                    }</div>
                </div>)
              }
     
            </div >

          </div>
        </div>)
      }




      <Link onClick={() => { setGoBack(!goBack); setDisabledLogo(true); }} to='/' style={{ textDecoration: 'none', color: '#000' }}>
        <motion.div
          // transition={{duration: 1 }}
          layoutId='log_button'
          className='detail_logout'
        >
          <Button type='logout' name='ลงชื่อออก' />
        </motion.div>
      </Link>
      <Toaster />
    </motion.div>
  )
}

export default Detail

