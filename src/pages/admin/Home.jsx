import { useState, useEffect, useRef } from "react"

import EventModal from "../../components/eventModal"
import NewAppointmentModal from "../../components/newAppointmentModal"
import Calender from "../../components/Calendar"
import Patients from "./Patients"

export default function AHome(){
    const calendarRef = useRef(null);
    const patientsRef = useRef(null);
    const [page, setPage] = useState("calendar")

    useEffect(()=>{
        if(!calendarRef || !patientsRef)return
        if(page === "calendar"){
            calendarRef.current.classList.remove("hidden")
            patientsRef.current.classList.add("hidden")
        }else if(page === "patients"){
            calendarRef.current.classList.add("hidden")
            patientsRef.current.classList.remove("hidden")
        }
    },[page])

    return (
        <div  >
                <div className="p-3 m-2 mt-0 pt-0 pl-0 ml-0 mr-0 text-[#8f8f8fe6] font-medium w-full bg-[#f1f1f18d] rounded-[10px]">
                    <div className=" flex">
                        <input
                            name="sideNav"
                            type="radio"
                            id="Calendar"
                            value="calendar"
                            defaultChecked
                            onChange={(e) => setPage(e.target.value)}
                        />
                        <label htmlFor="Calendar">
                            <section id="dir" className="flex">
                                <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="1 -2 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-[5px]"
                                >
                                    <path
                                        d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                    />
                                </svg>
                                Calendar
                            </section>
                        </label>

                        <input
                            name="sideNav"
                            type="radio"
                            id="Patients"
                            value="patients"
                            onChange={(e) => setPage(e.target.value)}
                        />
                        <label htmlFor="Patients">
                            <section id="dir" className="flex">
                                <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="3 -2 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-[5px]"
                                >
                                    <path
                                        d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                    />
                                </svg>
                                Patients
                            </section>
                        </label>

                    
                    </div>
                </div>
            <div ref={calendarRef} className="w-[75%] h-[700px] m-auto mt-[10px] ">
                <Calender />
                <EventModal />
                <NewAppointmentModal />
            </div>
            <div ref={patientsRef} >
                <Patients/>
            </div>
        </div>
    )
}