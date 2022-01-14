import React from 'react'
import './Main.css'
import Main_image from '../../assets/main_image.png'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion'
const Main = () => {
    return (
        <div className='main_container'>
            <motion.div layoutId='test'>
                <Logo />
            </motion.div>
            <Link to="/login" className='main_login'>ลงชื่อเข้าใช้</Link>
            <img className='main_img' src={Main_image}/>
        </div>
    )
}

export default Main
