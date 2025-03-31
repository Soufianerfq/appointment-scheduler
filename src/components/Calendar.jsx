import { ModalState } from "../store/modalStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect } from "react";
import axios from "../api/axios";
import { DataStore } from "../store/dataStore";

export default function Calender() {
  const customButton = {
    text: "+ Add Appointment",
    click: function () {
      setNewAppointment(!open);
    },
  };
  
  const modalState = ModalState((state) => state.isOpen);
  const setEvent = ModalState((state) => state.setEvent);
  const open = modalState.newAppointment;
  const setNewAppointment = ModalState((state) => state.setNewAppointment);
  const clickedEvent = DataStore((state) => state.clickedEvent);
  const events = DataStore((state) => state.events);
  const setEvents = DataStore((state) => state.setEvents);
  const setClickedEvent = DataStore((state) => state.setClickedEvent);


  useEffect(()=>{
    console.log(events)
    const controller = new AbortController();
    let isMounted = true;

    const getAppointments = async ()=>{
      try{
        const responce = await axios.get('/appointments',{signal: controller.signal});
        isMounted && setEvents(responce.data)
        console.log(responce.data)
        console.log(events)
      } catch(err) {console.log(err)}
    }

    getAppointments()
  },[])

  return (
    <>
      <FullCalendar
        height="100%"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={() => setNewAppointment(!modalState.newAppointment)}
        customButtons={{ customButton }}
        headerToolbar={{
          left: "prev,next,today,dayGridMonth,dayGridWeek",
          center: "title",
          right: "customButton",
        }}
        eventClick={(e) => {
          const event = events.find(({title})=> title == e.event.title)
          setClickedEvent(event);
          setEvent(!modalState.event);
        }}
      />
    </>
  );
}
