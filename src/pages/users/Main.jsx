import React from 'react'
import './Main.css'
import Main_image from '../../assets/main_image.png'
import Logo from '../../components/Logo'
import Button from '../../components/Button'

const Main = () => {
    return (
        <div className='main_container'>
            <Logo/>
            <img className='main_img' src={Main_image}/>
        </div>
    )
}

export default Main
