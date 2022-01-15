import React from 'react'
import './Login.css'
import Img_nerd from '../../assets/nerd_image.png'
import Logo from '../../components/Logo'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='login_container'>
            <Link to='/'>
                <div className='login_logo_container'>
                        <motion.div
                            transition={{ duration: 1 }}
                            layoutId='test'
                            style={{ rotate: -20,  }}
                            className="login_logo">
                            <Logo/>
                        </motion.div>
                        <img className='login_img' src={Img_nerd} />
                </div>
            </Link>
            <form className="login_form_container">
                <div>เบอร์โทรศัพท์</div>
                <input type="number" />
                <button>ลงชื่อเข้าใช้</button>
            </form>
        </div>
    )
}

export default Login
