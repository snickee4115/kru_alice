import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Button.css'

const Button = ({ name, to, type }) => {
    const navigate = useNavigate();
    
    return (
        // <button className="button_container">
            <button onClick={()=>navigate(to)} className={type+'_button'}>
                {name}
            </button>
        // </button>
    )
}

export default Button
