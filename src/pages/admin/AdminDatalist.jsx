import React from 'react'
import './AdminDatalist.css'
import Undo from '../../assets/undo.png'
import { Link } from 'react-router-dom'
import Name from '../../components/Name.jsx'
import Button from '../../components/Button'
import Plus from '../../assets/Plus.png'


export const AdminDatalist = () => {
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
        
    <div className='admin_data_main'>
           <div className='admin_data_name'>
                <Name name={na}/>   
            </div>

            <Link  to ='/detail'>
            <img className='admin_data_undo' src={Undo}></img>
             </Link>
             <div className='admin_data_course_name' >คอร์สเตรียมสอบอังกฤษประถมต้น</div>

            <div className='admin_data_title'>
                <div className='admin_data_type'>{titlee.day}</div>
                <div className='admin_data_type' style={{color: "#5E35B7"}} >{titlee.cour}</div>
                <div className='admin_data_type'style={{color: "red"}}>{titlee.statu}</div>
            </div>

            <div className='admin_data_data'>
                   
                    {ti.map((value,index ) => <div className='admin_list_data'> 
                        <div className='admin_data_count'>{index+1}</div>  
                        <div className='admin_data_date'>{value.date}</div>    
                        <div className='admin_data_time'>{value.tim} </div>    </div>)}


                    <div className='admin_data_result'>
                        <div className='admin_dr1'>รวม<a>{re}</a></div>
                        <div className='admin_dr2'>เหลือ<a>{re}</a></div>
                    </div>
                <div className='admin_time'>
                    <div className='admin_button_main'>
                    <Button type='time'name="ลงเวลาเรียน 1 Hr. 0 M." />
                    
                     </div>
                </div>
                <div className='plus_wraper'>
                    <img className="plus_img" src={Plus}></img>
                    <img className="plus_img" src={Plus}></img>
                    <Button type="sub" name="reset"/>
                </div>

                <div  className='admin_time' >
                    <Button type="ap" name="ขาดเรียน 2 ชม."/>
                </div>
            </div>
            <div className='admin_data_cf'>
                ยังไม่ชำระเงิน
            </div>
    </div>
    )
}

export default AdminDatalist
