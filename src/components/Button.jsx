import React from 'react'
import './Button.css'

const Button = ({name}) => {
    return (
        <div className='button_container'>
            <div>{name}</div>
        </div>
    )
}

export default Button
