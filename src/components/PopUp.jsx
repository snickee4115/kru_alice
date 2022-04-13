import React from 'react'
import './PopUp.css'

const PopUp = ({content, ok, cancel, onOk , onCancel, typeButton, style, bgcolor}) => {
  return (
    <div style={{visibility:style ? 'hidden' : 'visible'}}  className='popup_container'>
        <div className="popup_box" style={bgcolor && {backgroundColor:bgcolor}}>
              <div className='popup_content'>
                {content}
              </div>
              <div className='popup_button_container'>
                <button type={typeButton} onClick={onOk} className='popup_ok'>{ok}</button>
                <button type='button' onClick={onCancel} className='popup_cancel'>{cancel}</button>
              </div>
        </div>
    </div>
  )
}

export default PopUp