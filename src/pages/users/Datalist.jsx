import React, { useEffect, useState } from "react";
import "./Datalist.css";
import Undo from "../../assets/undo.png";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Name from "../../components/Name.jsx";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment";
import Loading from '../../components/Loading'

export const Datalist = () => {
  const { stdid, telstd } = useParams();
  const [studentName, setStudentName] = useState();
  const [searchParams] = useSearchParams();
  const courseid = searchParams.get("courseid");
  const [courses, setCourses] = useState([]);
  const [stamp, setStamp] = useState([]);
  const [absent, setAbsent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await getDoc(doc(db, "students", stdid)).then((doc) => {
      setStudentName(doc.data().name);
    });

    const unsub = onSnapshot(
      doc(db, "students", stdid, "courses", courseid),
      (doc) => {
        setCourses(doc.data());
        // setStamp(docSnap.data().stamp);
        if (!doc.data().stamp) {
          let temp = [];
          for (let i = 0; i < 10; i++) {
            temp.push({ date: "", hours: "" });
          }
          setStamp(temp);
        } else if (doc.data().stamp) {
          new Promise((resolve) => {
            setStamp(doc.data().stamp);
            const x = doc
              .data()
              .stamp.map((member) => !member.status && member.date);

            setAbsent(x);
            resolve();
          })
            .then(() => {
              if (doc.data().stamp.length < 10) {
                let temp = [];
                for (let i = 0; i < 10 - doc.data().stamp.length; i++) {
                  temp.push({ date: "", hours: "", status: "" });
                }
                return temp;
              }
              return [];
            })
            .then((temp) => {
              setStamp((prevState) => [...prevState, ...temp]);
              setLoading(false);
            });
        }
      }
    );
      
    return () => unsub();
  }, []);
  const navigate = useNavigate();
  
  if (loading) {
    return <Loading/>
  }
  return (
    <div className="datalist_main">
      <div
        className="datalist_name"
        style={{
        //   border:'3px solid',
          position:'relative',
          marginTop: "7%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          style={{ cursor: "pointer", position: "absolute",top:'45%',left:'8%',transform:'translate(-50%,-50%)'}}
          onClick={() => {
            navigate("/detail/" + telstd);
          }}
          className="datalist_undo"
          src={Undo}
        ></img>
        <div>
          <Name name={studentName} />
        </div>
      </div>

      <div className="cover_course_name">
        <div className="course_name">{courses.courseName}</div>
      </div>
      <div className="datalist_title">
        <div className="datalist_type">{courses.detail}</div>
        <div
          className="datalist_type"
          style={{ color: courses.payStatus ? "#009900" : "#BD0000" }}
        >
          (
          {courses.payStatus
            ? "ชำระแล้ว " +
              moment(courses.payStatus.toDate()).locale("th").format("L")
            : "ยังไม่ชำระเงิน"}
          )
        </div>
      </div>

      <div className="datalist_data">
        {/* <div className='list_data'> 
                        <div className='datalist_count'>{ti.map((value,index) => <div>ครั้งที่{index+1} </div>  )}</div>
                        <div className='datalist_date'>{ti.map((value,index) => <div>{value.date} </div>)}</div>
                        <div className='datalist_time'>{ti.map((value,index) => <div>{value.tim} </div>)}</div>
                    </div> */}
        {stamp.map((stamp, index) => (
          <div key={index} className="list_data">
            <div className="datalist_count">ครั้งที่{index + 1}</div>
            <div className="datalist_date">
              {stamp.date
                ? moment(stamp.date.toDate())
                    .locale("en")
                    .format("ddd")
                    .toUpperCase() +
                  " " +
                  moment(stamp.date.toDate()).locale("th").format("L")
                : ""}
            </div>
            <div
              className="datalist_time"
              style={
                stamp.status
                  ? {}
                  : { color: "#BD0000" } && stamp.hours != ""
                  ? { color: "#BD0000" }
                  : { cursor: "unset" }
              }
            >
              {stamp.hours
                ? parseInt(stamp.hours) +
                  " Hr " +
                  Math.round(stamp.hours * 60 - parseInt(stamp.hours) * 60) +
                  " Min"
                : ""}
            </div>
          </div>
        ))}

        <div className="nt">
          <div className="datalist_result">
            <div className="result_sum">
              <div>รวม</div>
              <div className="result_flex">
                <div>
                  {parseInt(courses.sumHours) +
                    " Hr. " +
                    Math.round(
                      courses.sumHours * 60 - parseInt(courses.sumHours) * 60
                    ) +
                    " Minute."}
                </div>
              </div>
            </div>
            <div className="result_remain">
              <div>เหลือ</div>
              <div className="result_flex">
                <div style={courses.overHours ? { color: "#BD0000" } : null}>
                  {courses.overHours
                    ? "เกิน " +
                      parseInt(courses.overHours) +
                      " Hr. " +
                      Math.round(
                        courses.overHours * 60 -
                          parseInt(courses.overHours) * 60
                      ) +
                      " Minute."
                    : parseInt(10 - courses.sumHours) +
                      " Hr. " +
                      Math.round(
                        (
                          10 -
                          courses.sumHours -
                          Math.floor(10 - courses.sumHours)
                        ).toFixed(2) * 60
                      ) +
                      " Minute."}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nt">
          <div className="datalist_ap">
            <div>ขาด</div>
            {absent.map(
              (absent, index) =>
                absent && (
                  <span>
                    {moment(absent.toDate())
                      .locale("en")
                      .format("ddd")
                      .toUpperCase() +
                      " " +
                      moment(absent.toDate()).locale("th").format("L")}
                  </span>
                )
            )}
          </div>
        </div>
        <div className="datalist_alert">
          <div>
            กรณีดังต่อไปนี้ <a style={{ color: "red" }}>ไม่นับเป็นขาด</a>
          </div>
          <div>1.ครูยกเลิกคลาสเอง</div>
          <div>2.คุณครูเลื่อนคลาสไปเวลาอื่่นและนักเรียน ขาด</div>
          <div>
            3.นักเรียนขาดในคลาสเสาร์อาทิตย์
            แต่สามารถชดเชยได้ในวันธรรมดาช่วงเวลาที่คุณครูว่าง
          </div>
        </div>
      </div>

      <span
        className="datalist_cf"
        style={
          courses.payStatus
            ? { backgroundColor: "#BCBCBC", color: "#000" }
            : null
        }
      >
        {courses.payStatus ? "ชำระเงินแล้ว" : "ยังไม่ชำระเงิน"}
      </span>
    </div>
  );
};

export default Datalist;
