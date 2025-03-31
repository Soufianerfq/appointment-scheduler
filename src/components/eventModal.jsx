import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ModalState } from "../store/modalStore";
import { DataStore } from "../store/dataStore";
import axios from "../api/axios";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function EventModal() {
  const modalState = ModalState((state) => state.isOpen);
  const setEvent = ModalState((state) => state.setEvent);
  const setEvents = DataStore((state)=>state.setEvents)
  const handleClose = () => setEvent(false);
  const clickedEvent = DataStore((state) => state.clickedEvent);
  const [newDate, setNewDate] = useState();
  
const cancelAppointment = async () => {
    try{
  const request = await axios.delete(`/appointments/${clickedEvent._id}`,
      {
        headers: { "Content-Type": "application/json" },
      })
      setEvents(request.data)
      setEvent(false)
      console.log(request.data)
    } catch(err){
      console.log(err)
    }
  };

  const rescheduleAppointment = async ()=>{
    try{
      const request = await axios.put(`/appointments/${clickedEvent._id}`, JSON.stringify({
        appointmentDate: newDate
      }) ,{headers: { "Content-Type": "application/json" }})
      setEvents(request.data)
      setEvent(false)
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div id={clickedEvent.id}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalState.event}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalState.event}>
          <Box sx={style}>
            <div className="modal">
              <div className=" mb-4">
                <h2 className="ml-0">Patient Name:</h2>
                <h1 className="font-semibold"> {clickedEvent.title}</h1>
              </div>
              <div className="mb-4">
                <h2 className="ml-0">visit type:</h2>
                <h1 className="font-semibold">{clickedEvent.type}</h1>
              </div>
              <div className=" w-[300px] mb-4">
                <h2>About the Patient</h2>
                <p className="break-words">
                  {clickedEvent.description}
                </p>
              </div>
              <div className="">
                <h2>Date</h2>
                <input className="ml-0" type="date" defaultValue={clickedEvent.date} onChange={(e)=> setNewDate(e.target.value)}/>
              </div>
              <button id="reschedule" className="block" onClick={()=>rescheduleAppointment()}>
                Re-Schedule
              </button>
              <button id="cancel" className="block" onClick={()=>cancelAppointment()}>
                Cancel Appointment
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
