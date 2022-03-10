import React, { useState } from 'react'
import { auth, db } from '../../firebase'
import { getDoc, doc, setDoc, Timestamp } from 'firebase/firestore'
import './AdminLogin.css'
import Button from '../../components/Button'
import AdminLogo from '../../assets/admin_logo.png'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const AdminLogin = () => {

  const [data, setData] = useState({
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: 'กรุณากรอกข้อมูลให้ครบ' });
      toast.error('กรุณากรอกข้อมูลให้ครบ');
      console.log(error);
    } else {
      try {
        // const result = await signInWithEmailAndPassword(auth, email, password);
        // const docSnap = await getDoc(doc(db, 'admin', result.user.uid));
        // if (!(docSnap && docSnap.data()?.uid == result.user.uid)) {
        //     await setDoc(doc(db, 'admin', auth.currentUser.uid), {
        //     uid: auth.currentUser.uid,
        //     email: email,
        //     password: password,
        //     createAt: Timestamp.fromDate(new Date()),
        //   })
        // }
        const result = new Promise((resolve) => {
          resolve(signInWithEmailAndPassword(auth, email, password));
        }).then((result) => {
          return getDoc(doc(db, 'admin', result.user.uid));
        }).then((docSnap) => {
          if (docSnap?.get('uid') == undefined) {
            // console.log(docSnap.);
              return setDoc(doc(db, 'admin', auth.currentUser.uid), {
              uid: auth.currentUser.uid,
              email: email,
              password: password,
              createAt: Timestamp.fromDate(new Date()),
            })
          }
          return ;
        }).then(() => {
          setData({
            email: '',
            password: '',
            error: null,
            loading: false,
          });
          
        })
        toast.promise(result, {
          loading: 'กำลังเข้าสู่ระบบ',
          success: 'เข้าสู่ระบบสำเร็จ',
          error: 'เข้าสู่ระบบไม่สำเร็จ'
        }).then(() => {
          navigate("/student_list");
      })
        
        // navigate("/student_list");
 
        
      } catch (err) {
        setData({ ...data, error: err.message, loading: false });
        if (err.code == 'auth/wrong-password') {
          setData({ ...data, error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง", loading: false });
          toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        } else if (err.code == 'auth/too-many-requests'){
          setData({ ...data, error: "มีการเข้าสู่ระบบมากเกินไปกรุณาลองใหม่ในอีกซักครู่", loading: false });
          toast.error("มีการเข้าสู่ระบบมากเกินไปกรุณาลองใหม่ในอีกซักครู่");
        } else if (err.code == 'auth/user-not-found') {
          setData({ ...data, error: "ไม่พบอีเมลนี้ในระบบกรุณาลองใหม่อีกครั้ง", loading: false });
          toast.error("ไม่พบอีเมลนี้ในระบบกรุณาลองใหม่อีกครั้ง");
        } else if (err.code == 'auth/invalid-email') {
          setData({ ...data, error: "กรุณากรอกอีเมลให้ถูกต้อง", loading: false });
          toast.error("กรุณากรอกอีเมลให้ถูกต้อง");
        }
        // console.log(err.code);
        
        
      }
    }
  }


  return (
    <div className='alogin_container'>
        <div  className='alogo'>
          <img src={AdminLogo} />
        </div>
      <form onSubmit={handleSubmit} className="alogin_form_container">
        <div>Email</div>
        <input type="text" name='email' value={email} onChange={handleChange}/>
        <div>Password</div>
        <input type="password" name='password' value={password} onChange={handleChange} />
        {/* {error ?
          <div style={{
            position: 'relative',
            color: 'red',
            fontSize: 'calc(1vw + 11px)',
            top: '10px'
          }}>{error}</div>
          :
          <div style={{
            position: 'relative',
            color: 'red',
            fontSize: 'calc(1vw + 11px)',
            top: '10px',
            visibility:'hidden'
          }}>ข้อความที่ซ่อน</div>} */}
        <Button typeButton={'submit'} type='login' name={loading ? 'กำลังเข้าสู่ระบบ ...' :'ลงชื่อเข้าใช้'} />
        
      </form>
      <Toaster />
    </div>
  )
}

export default AdminLogin