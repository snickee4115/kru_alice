import React from 'react'
import './PopUp.css'

const PopUp = (props) => {
  return (
    <div className='popup_container'>
        <div className="popup_box">
              <div className='popup_content'>
                {props.content}
              </div>
              <div className='popup_button_container'>
                <button onClick={props.onClose} className='popup_ok'>{props.ok}</button>
                <button onClick={props.onClose} className='popup_cancel'>{props.cancel}</button>
              </div>
        </div>
    </div>
  )
}

export default PopUp