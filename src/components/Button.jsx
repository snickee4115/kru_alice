import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Button.css'

const Button = ({ name, to, type, onClick, typeButton }) => {
    const navigate = useNavigate();
    
    return (
        // <button className="button_container">
            <button type={typeButton} onClick={onClick ? onClick : ()=>to ? navigate(to):null} className={type+'_button'}>
                {name}
            </button>
        // </button>
    )
}

export default Button
