import Calender from "../components/Calendar"
import NewAppointmentModal from "../components/newAppointmentModal"
import EventModal from "../components/eventModal"

export default function Home(){
    return (
        <div className="w-[75%] h-[700px] m-auto mt-[30px] ">
            <Calender />
            <EventModal />
            <NewAppointmentModal />
        </div>
    )
}