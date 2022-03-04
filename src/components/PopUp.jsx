import React from 'react'
import './PopUp.css'

const PopUp = ({content, ok, cancel, onOk , onCancel}) => {
  return (
    <div className='popup_container'>
        <div className="popup_box">
              <div className='popup_content'>
                {content}
              </div>
              <div className='popup_button_container'>
                <button onClick={onOk} className='popup_ok'>{ok}</button>
                <button onClick={onCancel} className='popup_cancel'>{cancel}</button>
              </div>
        </div>
    </div>
  )
}

export default PopUp