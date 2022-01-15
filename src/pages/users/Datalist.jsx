import React from 'react'
import './Datalist.css'
import Undo from '../../assets/undo.png'



const Datalist = () => {
    return (
        <div className='datalist_main'>
            <div className='datalist_name'>น้องเจแปน</div>
            <img className='datalist_undo' src={Undo}></img>


            <div className='datalist_title'>
                <div className='datalist_type'>เรียนวันพฤหัส 17.30 - 19.30 น.</div>
                <div className='datalist_type'>คอร์สที่ 2 : เรียน 10 ครั้ง 2000 บาท</div>
                <div className='datalist_type'>(ยังไม่ชำระเงิน)</div>
            </div>

            
            <div className='datalist_data'>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
                <div> จี้</div>
            </div>


        </div>
    )
}

export default Datalist
