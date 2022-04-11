import React, { useEffect, useState } from 'react'
import './Login.css'
import Img_nerd from '../../assets/nerd_image.png'
import Logo from '../../components/Logo'
import {motion} from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { async } from '@firebase/util'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [tel, setTel] = useState();
    const navigate = useNavigate();
    const [go, setGo] = useState(false);
  

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tel) { 
            toast.error('กรุณากรอกเบอร์โทรศัพท์');
        } else {
            let stdid;

            const login = new Promise(async (resolve, reject) => {
                const q = query(collection(db, 'students'), where('tel', '==', tel));
                const querySnapshot = (await getDocs(q)).size;
                if (querySnapshot > 0) {
                    resolve();
                } else {
                    reject();
                }
            })
          
            toast.promise(login, {
                loading: 'กำลังเข้าสู่ระบบ',
                success: 'เข้าสู่ระบบสำเร็จ',
                error: 'ไม่พบหมายเลขนี้ในระบบ'
            }).then(()=>{
                navigate('/detail/'+tel)
            })
    
        }

       

        
    }

    return (
            <motion.div
                
                initial={go ? { opacity: 0, x: '-25%' } :{ opacity: 0, x: '100px' }}
                animate={{ opacity: 1, x: 0 }}
                exit={go ? { opacity: 0, x: '-25%' } :{ opacity: 0, x: '25%' }}
                transition={{duration: 0.5 }}
            >
                <div className='login_container'>
                    <Link to='/' >
                        <div className='login_logo_container'>
                                <motion.div
                                    transition={{ duration: 1 }}
                                    layoutId={'logo'}
                                    style={{ rotate: -20,  }}
                                    className="login_logo">
                                    <Logo/>
                                </motion.div>
                                <img className='login_img' src={Img_nerd} />
                        </div>
                    </Link>
                    <form onSubmit={handleSubmit} className="login_form_container">
                        <div>เบอร์โทรศัพท์</div>
                    <input
                        type="number"
                        onChange={(e) => 
                        setTel(e.target.value)} 
                    />
                    <motion.button
                            transition={{ duration: 1 }}
                            layoutId='log_button'
                            onClick={() =>{ 
                                setGo(!go);
                                // navigate('/detail/')
                            }}
                            className='login_button'
                    
                        >
                            ลงชื่อเข้าใช้
                    </motion.button>
                    </form>
                    
                </div>
                <Toaster />
            </motion.div>
    )
}

export default Login
