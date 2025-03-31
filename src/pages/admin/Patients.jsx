import { useState, useEffect } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrvt"
import { useLocation, useNavigate } from "react-router-dom";

export default function Patients(){

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const location = useLocation();
    const [patients, setPatients] = useState([])


    useEffect(() => {

        const controller = new AbortController()
        //allows us to cancel request to axios, in this case when the componoent unmounts (page closed), it wil cancel the get request
        const getPatients = async () => {
            try {
                const response = await axiosPrivate.get('/patients', {
                    signal: controller.signal
                });
                // console.log(response.data);
                setPatients(response.data)
                console.log(response.data)
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        };
        getPatients()
        // return () => { //clean up function, called when the component unmounts
        //     isMounted = false;
        //     controller.abort()
        // };

    }, [])

    const deletePatient = async(id)=>{
        try { 
            const response = await axiosPrivate.delete(`/patients/${id}`) 
            setPatients(response.data)
        }catch(err){
            console.log(err)
        }
        
    }
    return (
        <>
            <div id="patients" className="w-[500px] h-[700px] mx-auto mt-[70px]">
                <h3 className="text-[25px] font-semibold w-fit ml-[25px] pt-[20px] mb-[30px]"> Patients</h3>

                <div>
                    <div className="flex w-full justify-between px-[50px] mb-[20px]">
                        <h3 className=" ">Name</h3>
                        <h3>Next Appointment</h3>
                    </div>
                    {
                        patients.map((patient)=>{
                            return(
                                <div className="flex">
                                    <div className="flex w-full justify-between px-[50px] pb-2 mb-3 border-b-[1px] border-[#ebebeb] w-[50%] mb-[15px]">
                                        <h3 className="font-semibold">{patient.fullname}</h3>
                                        <h3>{patient.date}</h3>
                                    </div>
                                    <button className="mb-[23px] mr-[30px] cursor-pointer" onClick={()=>deletePatient(patient._id)}>X</button>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}