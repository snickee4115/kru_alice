import React, { useContext, useEffect, useRef, useState } from "react";
import "./AdminDatalist.css";
import Undo from "../../assets/undo.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Name from "../../components/Name.jsx";
import Button from "../../components/Button";
import Plus from "../../assets/Plus.png";
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    Timestamp,
    updateDoc,
    writeBatch,
} from "firebase/firestore";
import { AuthContext } from "../../context/auth";
import DataContext from "../../data/DataContext";
import EditImg from "../../assets/edit.png";
import Popup from "../../components/PopUp";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import moment from "moment/min/moment-with-locales";
import toast, { Toaster } from "react-hot-toast";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import ClickAndHoldWrapper from "react-click-and-hold/core";

export const AdminDatalist = () => {
    const navigate = useNavigate();
    const [hours, setHours] = useState(60);
    const [curStamp, setCurStamp] = useState();
    const [editHours, setEditHours] = useState();
    const [editMinute, setEditMinute] = useState();
    const [editIndex, setEditIndex] = useState();
    const { nameStudent } = useContext(AuthContext);
    // const [stdid, setStdid] = useState();
    const { pathname } = useLocation();
    const stdid = pathname.split("/")[3];
    const { courseid } = useParams();
    const { setHome } = useContext(DataContext);
    const [stamp, setStamp] = useState([]);
    const [popup, setPopup] = useState();
    const [payStatus, setPayStatus] = useState();
    const [courses, setCourses] = useState([
        {
            courseName: "",
            createAt: "",
            detail: "",
            finished: "",
            overHours: "",
            ownerCourseID: "",
            sumHours: "",
            stamp: [
                {
                    date: "",
                    hours: "",
                    status: "",
                },
            ],
        },
    ]);
    const { setUback } = useContext(DataContext);
    // const dates = new DateObject({
    //     date: 1647200841*1000,
    // })

    const dates = new DateObject();

    useEffect(async () => {
        setUback("/student_list/detail_student/" + stdid);
        const unsub = onSnapshot(
            doc(db, "students", stdid, "courses", courseid),
            (doc) => {
                setCourses(doc.data());
                setPayStatus(doc.data().payStatus);
                if (doc.data().stamp == undefined) {
                    let temp = [];
                    for (let i = 0; i < 10; i++) {
                        temp.push({ date: "", hours: "" });
                    }
                    setStamp(temp);
                } else if (doc.data().stamp != undefined) {
                    new Promise((resolve) => {
                        setStamp(doc.data().stamp);
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
                        });
                }
                // setCourses(doc.data());
                // console.log(doc.data().stamp);
                //
                // if (doc.data().stamp.length < 10) {
                //     // console.log(ti.length);
                //     for (let i = 0; i < 10 - doc.data().stamp.length; i++){
                //         console.log(doc.data().stamp.length);
                //         // ti.push({ date: 's', tim: 's' });

                //     }
                //     // setStamp(ti)
                // }
                // console.log('ffffffff =' + dates.set({ date: 1647200811 * 1000 }).format());
                // const x = dates.set('2020/10/19').toUnix()
                // console.log("object =" + dates.set(x).format());
                // console.log('ffffffff =' +new DateObject({date:1647200811*1000}).format());
                // console.log('ffffffff =' +courses.stamp[1].date.seconds);
            }
        );
        // let getCourse = await getDoc(doc(db, 'students', stdid, 'courses', courseid)).then((getCourse) => {
        //     setCourses(getCourse.data());
        // })

        // let q = query(doc(db, 'students', stdid, 'courses', courseid));
        // let x = (await getDoc(q)).data();
        // console.log(x);

        setHome(true);
        // setStamp(ti);

        return () => unsub();
    }, []);

    const onUpdateDate = (value, index) => {
        // const x = dates.set({date:Timestamp.fromDate(new Date(value.unix*1000)).seconds*1000});
        // console.log(x.format());
        // console.log(value.unix);
        // console.log();

        const updateDate = new Promise((resolve) => {
            let newStamp = courses.stamp;
            newStamp[index].date = Timestamp.fromDate(new Date(value.unix * 1000));
            resolve(newStamp);
        }).then((newStamp) => {
            updateDoc(doc(db, "students", stdid, "courses", courseid), {
                stamp: newStamp,
            });
        });

        toast.promise(updateDate, {
            loading: "กำลังแก้ไขข้อมูล",
            success: "แก้ไขข้อมูลสำเร็จ",
            error: "แก้ไขข้อมูลไม่สำเร็จ",
        });

        // console.log(stamp);
        // const updateDate = updateDoc(doc(db, 'students', stdid, 'courses', courseid), {
        //     stamp: {
        //         [date]: 'r'
        //     },
        // })
    };

    const onUpdateHours = (hours, minute, index) => {
        const batch = writeBatch(db);
        const updateHours = new Promise((resolve) => {
            let newStamp = courses.stamp;
            newStamp[index].hours = Number(hours) + Number((minute / 60).toFixed(2));
            resolve(newStamp);
        })
            .then((newStamp) => {
                const sumHours = newStamp.reduce((pre, cur) => pre + cur.hours, 0);
                const oldOverHours =
                    courses.overHours == undefined ? 0 : courses.overHours;
                let newOverHours = sumHours > 10 ? sumHours - 10 : 0;

                updateDoc(doc(db, "students", stdid, "courses", courseid), {
                    stamp: newStamp,
                    sumHours: sumHours,
                    overHours: sumHours > 10 ? newOverHours : 0,
                    finished:
                        sumHours == 10 && courses.finished == null
                            ? Timestamp.fromDate(new Date())
                            : null,
                });

                // if (oldOverHours > newOverHours) {
                //     batch.update(doc(db, 'students', stdid), {
                //         overHours: {
                //             hours: sumHours >= 10 ? overHours.hours + (hours / 60) : overHours.hours + sumHours + (hours / 60) - 10,
                //             lastStamp: Timestamp.fromDate(new Date()),
                //         }
                //     })
                // }
                return { oldOverHours, newOverHours };
            })
            .then(({ oldOverHours, newOverHours }) => {
                console.log("oldOverHours = " + Number(oldOverHours));
                console.log("newOverHours = " + Number(newOverHours));
                const qo = getDoc(doc(db, "students", stdid))
                    .then((qo) => {
                        let allOverHours = qo.data().overHours;
                        allOverHours =
                            qo.data().overHours.hours == undefined
                                ? { hours: 0, lastStamp: null }
                                : qo.data().overHours;

                        return { allOverHours, oldOverHours, newOverHours };
                    })
                    .then(({ allOverHours, oldOverHours, newOverHours }) => {
                        if (oldOverHours > 0) {
                            console.log("oldOverHours > 0");

                            console.log("allOverHours = " + Number(allOverHours.hours));
                            updateDoc(doc(db, "students", stdid), {
                                overHours: {
                                    hours:
                                        oldOverHours > newOverHours
                                            ? Number(allOverHours.hours) -
                                            (Number(oldOverHours) - Number(newOverHours))
                                            : Number(allOverHours.hours) +
                                            (Number(newOverHours) - Number(oldOverHours)),
                                    lastStamp: allOverHours.lastStamp,
                                },
                            });
                        } else if (oldOverHours == 0 && newOverHours > 0) {
                            console.log("oldOverHours == 0 && newOverHours > 0");
                            console.log("allOverHours = " + Number(allOverHours.hours));
                            updateDoc(doc(db, "students", stdid), {
                                overHours: {
                                    hours:
                                        allOverHours.hours == 0
                                            ? newOverHours
                                            : allOverHours.hours + newOverHours,
                                    lastStamp: allOverHours.lastStamp,
                                },
                            });
                        }
                    });
            })
            .then(() => {
                batch.commit();
            });

        toast.promise(updateHours, {
            loading: "กำลังแก้ไขข้อมูล",
            success: "แก้ไขข้อมูลสำเร็จ",
            error: "แก้ไขข้อมูลไม่สำเร็จ",
        });
    };

    const onStamp = async (status, hours) => {
        // const qs = await getDoc(doc(db, 'students', stdid, 'courses', courseid));
        // let oldStamp = await qs.data().stamp
        // oldStamp = oldStamp == undefined ? [] : oldStamp;
        // // let sumHours = 0;
        // const sumHours = oldStamp.reduce((pre, cur) => pre + cur.hours, 0);
        // await updateDoc(doc(db, 'students', stdid, 'courses', courseid), {
        //     stamp: [...oldStamp,{
        //         date:Timestamp.fromDate(new Date()),
        //         hours: hours / 60 ,
        //         status: status == 'present' ? true : false,
        //     }],
        //     sumHours: sumHours + hours / 60 ,
        //     overHours:sumHours + (hours / 60) - 10 > 0 ?sumHours + (hours / 60) - 10: null,
        //     finished: sumHours + (hours / 60) >= 10 ?Timestamp.fromDate(new Date()): null ,
        // })
        // if (sumHours + (hours / 60) - 10 > 0) {
        //     const qo = await getDoc(doc(db, 'students', stdid));
        //     let overHours = qo.data().overHours;
        //     overHours = overHours == undefined ? {hours:0, lastStamp: null} : overHours;
        //     await updateDoc(doc(db, 'students', stdid), {
        //         overHours: {
        //             hours: sumHours >= 10 ? overHours.hours + (hours / 60) : overHours.hours + sumHours + (hours / 60) - 10,
        //             lastStamp: Timestamp.fromDate(new Date()),
        //         }
        //     })
        // }

        const addStamp = getDoc(doc(db, "students", stdid, "courses", courseid))
            .then((qs) => {
                let oldStamp = qs.data().stamp;
                return oldStamp == undefined ? [] : oldStamp;
            })
            .then((oldStamp) => {
                const sumHours = oldStamp.reduce((pre, cur) => pre + cur.hours, 0);
                return { oldStamp, sumHours };
            })
            .then(({ oldStamp, sumHours }) => {
                updateDoc(doc(db, "students", stdid, "courses", courseid), {
                    stamp: arrayUnion({
                        date: Timestamp.fromDate(new Date()),
                        hours: hours / 60,
                        status: status == "present" ? true : false,
                    }),
                    sumHours: sumHours + hours / 60,
                    overHours:
                        sumHours + hours / 60 - 10 > 0 ? sumHours + hours / 60 - 10 : null,
                    finished:
                        sumHours + hours / 60 == 10 ? Timestamp.fromDate(new Date()) : null,
                });
                return sumHours;
            })
            .then((sumHours) => {
                if (sumHours + hours / 60 - 10 > 0) {
                    const qo = getDoc(doc(db, "students", stdid))
                        .then((qo) => {
                            let overHours = qo.data().overHours;
                            overHours =
                                overHours.hours == undefined
                                    ? { hours: 0, lastStamp: null }
                                    : overHours;
                            return { overHours, sumHours };
                        })
                        .then(({ overHours, sumHours }) => {
                            updateDoc(doc(db, "students", stdid), {
                                overHours: {
                                    hours:
                                        sumHours >= 10
                                            ? overHours.hours + hours / 60
                                            : overHours.hours + sumHours + hours / 60 - 10,
                                    lastStamp: Timestamp.fromDate(new Date()),
                                },
                            });
                        });
                }
            });
        toast.promise(addStamp, {
            loading: "กำลังลงเวลาเรียน",
            success: "ลงเวลาเรียนสำเร็จ",
            error: "ลงเวลาเรียนไม่สำเร็จ",
        });
    };

    const onPayStatus = async () => {
        const updatePay = updateDoc(
            doc(db, "students", stdid, "courses", courseid),
            {
                payStatus: payStatus ? null : Timestamp.fromDate(new Date()),
            }
        ).then(() => {
            onSnapshot(doc(db, "students", stdid, "courses", courseid), (doc) => {
                setPayStatus(doc.data().payStatus);
            });
        });
        toast.promise(updatePay, {
            loading: "กำลังเปลี่ยนสถานะการชำระเงิน",
            success: "เปลี่ยนสถานะสำเร็จ",
            error: "เปลี่ยนสถานะไม่สำเร็จ",
        });
    };

    const ti = [
        { date: "SAT 12/06/2021 ", tim: "1 H. 0 S." },
        { date: "SAT 12/06/2021 ", tim: "1 H. 0 S." },
        { date: "SAT 12/06/2021 ", tim: "1 H. 0 S." },
        { date: "SAT 12/06/2021 ", tim: "1 H. 0 S." },
        { date: "SAT 12/06/2021 ", tim: "1 H. 0 S." },
        { date: "SAT 12/06/2021 ", tim: "1 H. 0 S." },
        { date: "SAT 12/06/2021 ", tim: "1 H. 0 S." },
        { date: "SAT 12/06/2021 ", tim: "1 H. 0 S." },
        { date: "SAT 12/06/2021 ", tim: "11 H. 60 S." },
        // {date:"SAT 12/06/2021 ",tim:"1 H. 0 S."}
    ];

    const na = "น้องเจแปน";
    const re = "5 Hr. 0 Min";
    const rem = "5 Hr. 0 Min.";
    const ap = "SAT 12/06/2021";
    const time = "11 Hr. 60 M.";
    const titlee = {
        day: "เรียนวันพฤหัส 17.30 - 19.30 น.",
        cour: "คอร์สที่ 2 : เรียน 10 ครั้ง 2000 บาท",
        statu: "(ยังไม่ชำระเงิน)",
    };
    const textareaRef = useRef();
    const cursorPosition = 0;

    return (
        <div className="admin_data_main">
            {/* <p style={{ whiteSpace: 'pre-line' }}>multi-line { '\n'}text </p> */}

            <div className="admin_data_course_name">
                <div style={{ marginRight: "2%" }}>{courses.courseName}</div>
                <img
                    onClick={() => {
                        navigate("../edit_course_title/" + courseid);
                    }}
                    style={{ marginLeft: "2%", objectFit: "contain", cursor: "pointer" }}
                    src={EditImg}
                />
            </div>

            <div className="admin_data_title">
                <div style={{ whiteSpace: "pre-line" }} className="admin_data_type">
                    {courses.detail}
                </div>
                {/* <div className='admin_data_type' style={{color: "#5E35B7"}} >{titlee.cour}</div> */}
                <div
                    className="admin_data_type"
                    style={payStatus ? { color: "#009900" } : { color: "#BD0000" }}
                >
                    (
                    {payStatus
                        ? "ชำระแล้ว " + moment(payStatus.toDate()).locale("th").format("L")
                        : "ยังไม่ชำระเงิน"}
                    )
                </div>
            </div>

            <div className="admin_data_data">
                <div className="admin_list_data_container">
                    {stamp.map((stamp, index) => (
                        <div key={index} className="admin_list_data">
                            <div className="admin_data_count">ครั้งที่ {index + 1}</div>
                            <div className="admin_data_date">
                                <DatePicker
                                    animations={[
                                        opacity(),
                                        transition({
                                            from: 40,
                                            transition:
                                                "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                        }),
                                    ]}
                                    className="rmdp-mobile"
                                    mobileLabels={{
                                        CANCEL: "Close",
                                        OK: "Accept",
                                    }}
                                    onChange={(value) => onUpdateDate(value, index)}
                                    render={(value, openCalendar) => {
                                        return (
                                            <ClickAndHoldWrapper
                                                id={1}
                                                elmType={"div"}
                                                onHold={() =>
                                                    stamp.date != "" ? openCalendar() : null
                                                }
                                                timeOut={500}
                                            >
                                                <div
                                                    style={stamp.date != "" ? {} : { cursor: "unset" }}
                                                    className="admin_data_datepicker"
                                                >
                                                    {stamp.date
                                                        ? moment(stamp.date.toDate())
                                                            .locale("en")
                                                            .format("ddd")
                                                            .toUpperCase() +
                                                        " " +
                                                        moment(stamp.date.toDate())
                                                            .locale("th")
                                                            .format("L")
                                                        : ""}
                                                </div>
                                            </ClickAndHoldWrapper>
                                        );
                                    }}
                                />
                            </div>
                            <div className="admin_data_time">
                                <ClickAndHoldWrapper
                                    id={1}
                                    elmType={"div"}
                                    onHold={() => {
                                        if (stamp.hours != "") {
                                            setEditHours(parseInt(stamp.hours));
                                            setEditMinute(
                                                Math.round(
                                                    (stamp.hours - parseInt(Math.floor(stamp.hours))) * 60
                                                )
                                            );
                                            setEditIndex(index);
                                            setCurStamp(stamp);
                                            setPopup("edithours");
                                        }
                                    }}
                                    timeOut={500}
                                >
                                    <div
                                        className="admin_data_time2"
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
                                            Math.round(
                                                stamp.hours * 60 - parseInt(stamp.hours) * 60
                                            ) +
                                            " Min"
                                            : ""}
                                    </div>
                                </ClickAndHoldWrapper>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="admin_data_result">
                    <div className="admin_dr1">
                        <div style={{ flexGrow: "1" }}>รวม</div>
                        <div>
                            {parseInt(courses.sumHours) +
                                " Hr. " +
                                Math.round(
                                    courses.sumHours * 60 - parseInt(courses.sumHours) * 60
                                ) +
                                " Minute."}
                        </div>
                    </div>
                    <div className="admin_dr2">
                        <div style={{ flexGrow: "1" }}>เหลือ</div>
                        <div style={courses.overHours ? { color: "#BD0000" } : null}>
                            {courses.overHours
                                ? "เกิน " +
                                parseInt(courses.overHours) +
                                " Hr. " +
                                Math.round(
                                    courses.overHours * 60 - parseInt(courses.overHours) * 60
                                ) +
                                " Minute."
                                : parseInt(10 - courses.sumHours) +
                                " Hr. " +
                                (
                                    10 -
                                    courses.sumHours -
                                    Math.floor(10 - courses.sumHours)
                                ).toFixed(2) *
                                60 +
                                " Minute."}
                        </div>
                    </div>
                </div>

                <div className="admin_button_main">
                    <Button
                        onClick={() => setPopup("addtime")}
                        type="time"
                        name={
                            "ลงเวลาเรียน " +
                            parseInt(hours / 60) +
                            " Hr. " +
                            (hours - parseInt(hours / 60) * 60) +
                            " M."
                        }
                    />
                </div>

                <div className="plus_time_container">
                    <div className="plus_time_wrapper">
                        <div className="plus_time" onClick={() => setHours(hours + 15)}>
                            <span className="circle plus"></span>
                        </div>
                        <span>(15 นาที)</span>
                    </div>
                    <div className="plus_time_wrapper">
                        <div className="plus_time" onClick={() => setHours(hours + 30)}>
                            <span className="circle plus"></span>
                        </div>
                        <span>(30 นาที)</span>
                    </div>
                    <Button onClick={() => setHours(60)} type="sub" name="reset" />
                </div>

                <div className="admin_time">
                    <Button
                        onClick={() => {
                            setPopup("addtimeover");
                        }}
                        type="ap"
                        name="ขาดเรียน 2 ชม."
                    />
                </div>
            </div>
            <div
                style={payStatus ? { backgroundColor: "#BCBCBC", color: "#000" } : null}
                onClick={() => setPopup("paycourse")}
                className="admin_data_cf"
            >
                {payStatus ? "ชำระเงินแล้ว" : "ยังไม่ชำระเงิน"}
            </div>
            {popup ? (
                <Popup
                    onOk={() => {
                        if (popup == "addtime") {
                            // console.log('addtime');
                            onStamp("present", hours);
                            setHours(60);
                            setPopup(null);
                        } else if (popup == "addtimeover") {
                            // setHours(120);
                            onStamp("absent", 120);
                            // console.log('addtimeover')
                            // setHours(60);
                            setPopup(null);
                        } else if (popup == "paycourse") {
                            onPayStatus();
                            // console.log('paycourse')
                            setPopup(null);
                        } else if (popup == "edithours") {
                            onUpdateHours(editHours, editMinute, editIndex);
                            setPopup(null);
                        }
                    }}
                    onCancel={() => {
                        setPopup(null);
                    }}
                    content={
                        popup == "addtime"
                            ? [
                                <div key={"key"}>
                                    ยืนยันลงเวลาเรียน {parseInt(hours / 60)} hr{" "}
                                    {hours - parseInt(hours / 60) * 60} Min. ?{" "}
                                    <div style={{ display: "inline-block" }}></div>
                                </div>,
                            ]
                            : null || popup == "addtimeover"
                                ? [
                                    <div key={"key"}>
                                        ยืนยันขาดเรียนเรียน 2 Hr. ?{" "}
                                        <div style={{ display: "inline-block" }}></div>
                                    </div>,
                                ]
                                : null || popup == "paycourse"
                                    ? [
                                        <div key={"key"}>
                                            ยืนยันจ่ายเงินหรือไม่ ?{" "}
                                            <div style={{ display: "inline-block" }}></div>
                                        </div>,
                                    ]
                                    : null || popup == "edithours"
                                        ? [
                                            <div className="popup-edithours" key={"key"}>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={editHours}
                                                    onChange={(e) => {
                                                        if (e.target.value >= 0) {
                                                            setEditHours(e.target.value);
                                                        }

                                                        // setCurStamp({ ...curStamp, hours: parseInt(e.target.value) + parseInt(curStamp.hours - Math.floor(curStamp.hours)) })
                                                        // console.log(curStamp)
                                                    }}
                                                />
                                                &nbsp;Hr&nbsp;
                                                <input
                                                    ref={textareaRef}
                                                    type="number"
                                                    onKeyDown={(e) => {
                                                        // if (e.key === 'Backspace' && e.target.value == 0) {
                                                        //     const target = e.currentTarget;
                                                        //     target.type = 'text';
                                                        //     target.selectionStart = 0;
                                                        //     target.type = 'number';
                                                        //     console.log('object');
                                                        // }
                                                    }}
                                                    // value={((curStamp.hours * 60) - (parseInt(curStamp.hours) * 60))}
                                                    value={editMinute}
                                                    onChange={(e) => {
                                                        if (e.target.value >= 60) {
                                                            // e.preventDefault();
                                                        } else {
                                                            setEditMinute(e.target.value);
                                                            setCurStamp({
                                                                ...curStamp,
                                                                hours:
                                                                    parseInt(Math.floor(curStamp.hours)) +
                                                                    Number((e.target.value / 60).toFixed(2)),
                                                            });
                                                        }

                                                        console.log(curStamp);
                                                    }}
                                                />
                                                &nbsp;Min
                                            </div>,
                                        ]
                                        : null
                    }
                    ok="ยืนยัน"
                    cancel="ยกเลิก"
                />
            ) : null}
            <Toaster />
        </div>
    );
};

export default AdminDatalist;
