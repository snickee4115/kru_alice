import React from 'react'
import './Main.css'
import Main_image from '../../assets/main_image.png'
import Logo from '../../components/Logo'

const Main = () => {
    return (
        <div className='main_container'>
            
            <img src={Main_image} style={{position:'absolute', bottom:'0px'}}/>
        </div>
    )
}

export default Main
