import React from 'react'
import Datalist

export const DatalistAdmin = () => {
    const timee = [
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
   
  return (
    <div>
         <div className='main'>
            <div className='name' >
                <Name name={na}/>
            </div>
            
            
            <Link  to ='/detail'>
            <img className='undo' src={Undo}></img>
             </Link>
             
                
            <div className='course_name' >คอร์สเตรียมสอบอังกฤษประถมต้น</div>

            <div className='title'>
                <div className='type'>เรียนวันพฤหัส 17.30 - 19.30 น.</div>
                <div className='type' style={{color: "#5E35B7"}} >คอร์สที่ 2 : เรียน 10 ครั้ง 2000 บาท</div>
                <div className='type'style={{color: "red"}}>(ยังไม่ชำระเงิน)</div>
            </div>

            
            <div className='data'>
                    {/* <div className='list_data'> 
                        <div className='datalist_count'>{ti.map((value,index) => <div>ครั้งที่{index+1} </div>  )}</div>
                        <div className='datalist_date'>{ti.map((value,index) => <div>{value.date} </div>)}</div>
                        <div className='datalist_time'>{ti.map((value,index) => <div>{value.tim} </div>)}</div>
                    </div> */}
                    {ti.map((value,index ) => <div className='list_data'> 
                        <div className='count'>{index+1}</div>  
                        <div className='date'>{value.date}</div>    
                        <div className='time'>{value.tim} </div>    </div>)}


                    <div className='result'>
                        <div className='dr1'>รวม<a>{re}</a></div>
                        <div className='dr2'>เหลือ<a>{re}</a></div>
                    </div>



    </div>
  )
}
export default DatalistAdmin
