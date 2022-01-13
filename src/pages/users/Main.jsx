import React from 'react'
import './Main.css'
import Main_image from '../../assets/main_image.png'
import Logo from '../../components/Logo'
import Button from '../../components/Button'

const Main = () => {
    return (
        <div className='main_container'>
            <div className='main_button'>
                <Button name={'ลงชื่อเข้าใช้'} />
            </div>
        </div>
    )
}

export default Main
