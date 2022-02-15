import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Button.css'

const Button = ({ name, to }) => {
    const navigate = useNavigate();
    
    return (
        <div onClick={()=>navigate(to)} className='button_container'>
            <div>{name}</div>
        </div>
    )
}

export default Button
