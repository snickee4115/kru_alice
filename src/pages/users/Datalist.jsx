import React from 'react'
import './Datalist.css'
import Undo from '../../assets/undo.png'
import { Link } from 'react-router-dom'
import Name from '../../components/Name.jsx'


const Datalist = () => {
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
    const re = [{result:"5 Hr. 0 Sec",remain:"5 Hr. 0 Sec."}]
    
    return (
        
        <div className='datalist_main'>
            <div className='datalist_name' >
                <Name name='น้องเจแปน'/>
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
                        <div className='datalist_count'>ครั้งที่{index+1}</div>  
                        <div className='datalist_date'>{value.date}</div>    
                        <div className='datalist_time'>{value.tim} </div>    </div>)}
                    <div className='datalist_result'> 
                        {re.map((value,index) => <div>รวม{value.result}</div>)}
                        {re.map((value,index) => <div>เหลือ{value.result}</div>)}
                    </div>

                    <div className='datalist_infomation'>
                        ddd
                    </div>



            </div>


        </div>
    )
}

export default Datalist
