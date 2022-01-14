import React from 'react'
import './Login.css'
import Img_nerd from '../../assets/nerd_image.png'
import Logo from '../../components/Logo'
import {motion} from 'framer-motion'

const Login = () => {
    return (
        <div className='login_container'>
            <motion.div transition={{duration:1}} layoutId='test' style={{rotate:-20}} className="login_logo">
                <Logo/>
            </motion.div>
            <img src={Img_nerd} />
        </div>
    )
}

export default Login
