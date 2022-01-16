import React, { useEffect } from 'react'
import './Main.css'
import Main_image from '../../assets/main_image.png'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion'

const Main = ({ disabledLogo, setDisabledLogo }) => {
    
    useEffect(() => {
        setDisabledLogo(false);
        return <motion.div/>
    }, [])
    
    
    return (
            <motion.div
                style={{position:'absolute', width: '100%', zIndex:'2'}}
                initial={{ opacity: 0, x: '-25%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-25%' }}
                transition={{ duration: 0.5 }}
                className='main_container'
            >
            {   disabledLogo ?
                <motion.div className='main_logo' transition={{ duration: 0 }} layoutId='logo'>
                    <Logo />
                </motion.div>
                :
                <motion.div className='main_logo'  layoutId='logo'>
                    <Logo />
                </motion.div>
            }
                <Link to="/login" className='main_login'>ลงชื่อเข้าใช้</Link>
                <img className='main_img' src={Main_image}/>
            </motion.div>
    )
}

export default Main
