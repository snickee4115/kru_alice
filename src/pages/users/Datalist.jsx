import React from 'react'
import './Datalist.css'
import Undo from '../../assets/undo.png'
import { Link } from 'react-router-dom'
import Name from '../../components/Name.jsx'



export const Datalist = () => {
    const ti = [
        {date:"SAT 12/06/2021 ",tim:"1 H. 0 S."},
        {date:"SAT 12/06/2021 ",tim:"1 H. 0 S."},
        {date:"SAT 12/06/2021 ",tim:"1 H. 0 S."},
        {date:"SAT 12/06/2021 ",tim:"1 H. 0 S."},
        {date:"SAT 12/06/2021 ",tim:"1 H. 0 S."},
        {date:"SAT 12/06/2021 ",tim:"1 H. 0 S."},
        {date:"SAT 12/06/2021 ",tim:"1 H. 0 S."},
        {date:"SAT 12/06/2021 ",tim:"1 H. 0 S."},
        {date:"SAT 12/06/2021 ",tim:"1 H. 0 S."},
        {date:"SAT 12/06/2021 ",tim:"1 H. 0 S."}
    ]
  
    const na = "น้องเจแปน"
    const re = "5 Hr. 0 Sec"
    const rem = "5 Hr. 0 Sec."
    const ap = "SAT 12/06/2021"
    return (
        
        <div className='datalist_main'>
            <div className='datalist_name' >
                <Name name={na}/>
            </div>
            
            
            <Link  to ='/detail'>
            <img className='datalist_undo' src={Undo}></img>
             </Link>
             
                
            <div className='course_name' >คอร์สเตรียมสอบอังกฤษประถมต้น</div>

            <div className='datalist_title'>
                <div className='datalist_type'>เรียนวันพฤหัส 17.30 - 19.30 น.</div>
                <div className='datalist_type' style={{color: "#5E35B7"}} >คอร์สที่ 2 : เรียน 10 ครั้ง 2000 บาท</div>
                <div className='datalist_type'style={{color: "red"}}>(ยังไม่ชำระเงิน)</div>
            </div>

            
            <div className='datalist_data'>
                    {/* <div className='list_data'> 
                        <div className='datalist_count'>{ti.map((value,index) => <div>ครั้งที่{index+1} </div>  )}</div>
                        <div className='datalist_date'>{ti.map((value,index) => <div>{value.date} </div>)}</div>
                        <div className='datalist_time'>{ti.map((value,index) => <div>{value.tim} </div>)}</div>
                    </div> */}
                    {ti.map((value,index ) => <div className='list_data'> 
                        <div className='datalist_count'>{index+1}</div>  
                        <div className='datalist_date'>{value.date}</div>    
                        <div className='datalist_time'>{value.tim} </div>    </div>)}


                    <div className='datalist_result'>
                        <div className='dr1'>รวม<a>{re}</a></div>
                        <div className='dr2'>เหลือ<a>{re}</a></div>
                        </div>


                        <div className='datalist_ap'>
                        <div >ขาด</div> 
                        <div></div>
                        <div><a > {ap} </a><a> {ap} </a></div>
                        
                    
                    </div>

                    <div className='datalist_alert'>
                           <div>กรณีดังต่อไปนี้ <a style={{color:"red"}}>ไม่นับเป็นขาด</a></div>
                           <div>1.ครูยกเลิกคลาสเอง</div>
                           <div>2.คุณครูเลื่อนคลาสไปเวลาอื่่นและนักเรียน
                               ขาด</div>
                           <div>3.นักเรียนขาดในคลาสเสาร์อาทิตย์ แต่สามารถชดเชยได้ในวันธรรมดาช่วงเวลาที่คุณครูว่าง</div>
                    </div>
            </div>
           
            <div className='datalist_cf'>
                ยังไม่ชำระเงิน
            </div>
            

        </div>
    )
}

export default Datalist
