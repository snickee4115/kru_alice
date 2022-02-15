import React, { useEffect, useState } from 'react'
import './Login.css'
import Img_nerd from '../../assets/nerd_image.png'
import Logo from '../../components/Logo'
import {motion} from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [tel, setTel] = useState();
    const navigate = useNavigate();
    const [go, setGo] = useState(false);
    console.log(go);
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
                    <form className="login_form_container">
                        <div>เบอร์โทรศัพท์</div>
                    <input
                        type="number"
                        onChange={(e) => 
                        setTel(e.target.value)} 
                    />
                    </form>
                    <motion.button
                            transition={{ duration: 1 }}
                            layoutId='log_button'
                            onClick={() =>{ 
                                setGo(!go);
                                navigate('/detail/')
                            }}
                            className='login_button'
                    
                        >
                            ลงชื่อเข้าใช้
                    </motion.button>
                </div>
            </motion.div>
    )
}

export default Login
