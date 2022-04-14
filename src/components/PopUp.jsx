import React from 'react'
import './PopUp.css'

const PopUp = ({content, ok, cancel, onOk , onCancel, typeButton, style, bgcolor, useButton=true, upload, imageSlip}) => {
  return (
    <div onClick={onCancel} style={{ visibility: style ? 'hidden' : 'visible' }} className='popup_container'>
      
        {imageSlip && <div
          onClick={(e) => { e.stopPropagation();}}
          className="popup_image"
          style={{
            backgroundColor: 'transparent',
            backgroundImage: `url(${imageSlip})`,
            backgroundSize: '80% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
          }}>
        </div>}
        {content && <div 
          className={upload ? "popup_box_upload" : "popup_box"}
          style={bgcolor && { backgroundColor: bgcolor }}
          onClick={(e) =>{e.stopPropagation();}}
          >
              <div className='popup_content'>
                {content}
              </div>
              {useButton && <div className='popup_button_container'>
                <button type={typeButton} onClick={onOk} className='popup_ok'>{ok}</button>
                <button type='button' onClick={onCancel} className='popup_cancel'>{cancel}</button>
              </div>}
        </div>}
    </div>
  )
}

export default PopUp