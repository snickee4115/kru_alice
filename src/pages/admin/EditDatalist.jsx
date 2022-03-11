import React from 'react'
import './EditDatalist.css'
import { Link } from 'react-router-dom'
import Name from '../../components/Name.jsx'
import Undo from '../../assets/undo.png'

export const EditDatalist = () => {
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
const time ="1 Hr. 0 M."
const titlee = {day:"เรียนวันพฤหัส 17.30 - 19.30 น.",cour:"คอร์สที่ 2 : เรียน 10 ครั้ง 2000 บาท",statu:"(ยังไม่ชำระเงิน)"}
  return (
    <div className='editdatalist_main'>
           <div className='editdatalist_name'>
                <Name name={na}/>   
            </div>

            <Link  to ='/detail'>
            <img className='editdatalist_undo' src={Undo}></img>
             </Link>
             <div className='editdatalist_course_name' >คอร์สเตรียมสอบอังกฤษประถมต้น</div>

            <div className='editdatalist_title'>
                <div className='editdatalist_type'>{titlee.day}</div>
                <div className='editdatalist_type' style={{color: "#5E35B7"}} >{titlee.cour}</div>
                <div className='editdatalist_type'style={{color: "red"}}>{titlee.statu}</div>
            </div>

            <div className='editdatalist_data'>
                   
                    {ti.map((value,index ) => <div className='editdatalist_list_data'> 
                        <div className='editdatalist_count'>{index+1}</div>  
                        <div className='editdatalist_date'>{value.date}</div>    
                        <div className='editdatalist_time'>{value.tim} </div>    </div>)}


                    <div className='editdatalist_result'>
                        <div className='editdatalist_dr1'>รวม<a>{re}</a></div>
                        <div className='editdatalist_dr2'>เหลือ<a>{re}</a></div>
                    </div>
          
        
           </div>
           <div className='editdatalist_cf'>
               ยังไม่ชำระเงิน
           </div>
     
  </div>
  )
}
export default EditDatalist