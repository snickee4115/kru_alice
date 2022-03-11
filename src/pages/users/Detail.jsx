import React, { useEffect, useState } from 'react'
import './Detail.css'
import Undo from '../../assets/undo.png'
import Cat from '../../assets/cat.png'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast';
import { collection, getDocs, onSnapshot, query, QuerySnapshot, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { async } from '@firebase/util'


const dek = [
            {name:'น้องเจแปน',coe:'คอสเรียนประถมต้น',tre:"เกิน 1 ชม"},
            {name:'น้องแมว',coe:'คอสเรียนมัธยมต้น',tre:"เหลือ 1 ชม."}
            ]

const Detail = ({ setDisabledLogo }) => {
  const [goBack, setGoBack] = useState(false);
  const ab = "  "
  const [studentList, setStudetList] = useState([{ id: '', name: '', course: [], hours: [] }]);
  // const [course, setCourse] = useState([{course: [], hours: 0 }]);
  const [course, setCourse] = useState([]);
  // const {}
  const [searchParams] = useSearchParams();
  const telstd = searchParams.get('telstd');

  useEffect(async () => {
    // const q = await query(collection(db, 'students'), where('tel', '==', telstd));
    
    // const unsub = await onSnapshot(q, (querySnapshot) => {
    //   let std = [];
    //   let index = 0;
    //   let courses = [{ course: [], hours: 0 }];
    //   querySnapshot.forEach(async (docSnap) => {
    //     std.push({
    //       id: docSnap.id,
    //       name: docSnap.data().name,
    //       course: [''],
    //       hours: '',
    //     });
    //     std[index].id = docSnap.id;

    //     const q = await query(collection(db, 'students', docSnap.id, 'courses'));
        
    //     await onSnapshot(q, async (querySnapshot) => {
    //       if (querySnapshot) {
    //         await querySnapshot.forEach(docSnap => {
    //           // console.log(docSnap.data().courseName);
    //           std[index].course.push(docSnap.data().courseName);
    //           std[index].hours = docSnap.data().sumHours;
    //           courses[index].course.push(docSnap.data().courseName);
            
    //         })
    //         index++
    //       }
          
    //     })
    //     // index = index+1;
        
    //   })
    //   // let courses = [{ course: [], hours: 0 }];
    //   // std.forEach(async (student) => {
    //   //   console.log(index);
    //   //   const q = await query(collection(db, 'students', student.id, 'courses'));
    //   //   await onSnapshot(q, async (querySnapshot) => {
    //   //     await querySnapshot.forEach(docSnap => {
    //   //       // console.log(docSnap.data().courseName);
    //   //       std[index].course.push(docSnap.data().courseName);
    //   //       std[index].hours = docSnap.data().sumHours;
    //   //       courses[index].course.push(docSnap.data().courseName);
    //   //     })
    //   //     index = index+1;
    //   //   })
        
    //   // })
let std = [];
    new Promise(async (resolve) => {
      const q = await query(collection(db, 'students'), where('tel', '==', telstd));
      
      (await getDocs(q)).forEach(async (docSnap) => {
        await std.push({
          id: docSnap.id,
          name: docSnap.data().name,
          course: [],
          hours: [],
        })
      })
      
      resolve(std)
    }).then(async (std) => {
      // setStudetList(std)
      console.log(std.length);;
      let index = 0;
      let newstd = [];;;
      for (let i = 0; i < std.length; i++){
        const q = query(collection(db, 'students', std[i].id, 'courses'));
        // setCourse([]);
        (await getDocs(q)).forEach(async (docSnap) => {
          newstd.push(docSnap.data().courseName);
          std[i].course.push(docSnap.data().courseName);
          std[i].hours.push(docSnap.data().sumHours);
        });
      }
      setCourse(newstd);;;
      setStudetList(std);
      // let index = 0;
      // let newstd = [];;;
      // std.forEach(async (student) => {
      //   const q = query(collection(db, 'students', student, 'courses'));
      //   setCourse([]);
      //   (await getDocs(q)).forEach( async (docSnap) => {
      //      newstd.push(docSnap.data().courseName);
      //     setCourse(...course, newstd);
      //   })
      // });
      
      
      // // console.log(std[0].course.length);
      return newstd;
    }).then((std) => {
      // console.log(std.length);;
      // std.forEach((e) => {
      //   console.log("e");
      // })
      
      // setCourse(std);
      // console.log(course[0].course[0]);
      // setStudetList(std);
      // console.log(course)
    })
    
    // });
    // setStudetList(std);
    //   setCourse(courses);
    //   console.log(studentList);
    //   console.log(course)
      // return () => unsub();
  }, [])

  return (
    
    <motion.div
      style={{position:'absolute', width: '100%'}}
      initial={{ opacity: 0, x: '25%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={goBack ? null : { opacity: 0, x: '25%' }}
      transition={{duration: 1 }}
      className='detail_container'>
        <Link to ='/login'>
          <img className='detail_undo' src={Undo}></img>
        </Link>
        <Link to ='/'>
          <div className='detail_logo'>
            <motion.div
                transition={{ duration: 0.5 }}
                layoutId='logo'
            >
              <Logo/>
            </motion.div>
          </div>
        </Link>
        <div className='emty'></div>
        
        {studentList.map((value,index) =>
        <div key={index} className='detail_wrapper'>
          
            <div className='cat_container'>

              <div >
                <div className='detail_student_name'>{value.name}</div>

               </div>
               <img className='catty' src={Cat} ></img>
                <div className='detail_type' >
                  COURSE
                </div>
            <div className='detail_type'>
              <div style={{ display:'flex', flexDirection:'column'}}>
                {value.course.map((course, index ) => 
                  <Link to='/datalist'  key={index}>
                    {course}
                  </Link>
                )}
              </div>
              <div className='remaint'>
                {value.hours.map((hours, index ) => 
                  <div key={index}>
                    {hours}
                  </div>
                )}
              </div>
            </div >         
          
            </div>
        </div>)
        }
        

        
        
      <Link onClick={() => { setGoBack(!goBack); setDisabledLogo(true); }} to ='/' style={{textDecoration:'none', color:'#000'}}>
        <motion.div
          // transition={{duration: 1 }}
          layoutId='log_button'
          className='detail_logout'
        >
          <Button type='logout' name='ลงชื่อออก'/>
        </motion.div>
        </Link>
        <Toaster />
    </motion.div>
  )
}

export default Detail

