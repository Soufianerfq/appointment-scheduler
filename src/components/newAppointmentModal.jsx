import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ModalState } from "../store/modalStore";
import { DataStore } from "../store/dataStore";
import DropDown from "./MUIcomponents/dropDown";
import { newAppointment } from "../store/newAppointmentStore";
import axios from "../api/axios";

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

export default function NewAppointmentModal() {
  const modalState = ModalState((state) => state.isOpen);
  const setNewAppointment = ModalState((state) => state.setNewAppointment);
  const handleClose = () => setNewAppointment(false); //Modal state (false = closed, true = open)

  const setTitle = newAppointment((state) => state.setTitle);
  const setDate = newAppointment((state) => state.setDate);
  const setDescription = newAppointment((state) => state.setDescription);
  const setID = newAppointment((state) => state.setID);
  const setPhone = newAppointment((state) => state.setPhone);
  const event = newAppointment((state) => state.event);
  const setEvents = DataStore((state)=>state.setEvents)

  const schedule = async () => {
    try{
    const request = await axios.post('/appointments', JSON.stringify({
      title: event.title,
      id: event.id,
      number: event.number,
      date: event.date,
      type: event.type,
      description: event.description,
      backgroundColor: event.backgroundColor,
      borderColor: event.borderColor
    }),
      {
        headers: { "Content-Type": "application/json" },
      })
    console.log(request.data)
    setEvents(request.data)
    setNewAppointment(false)
    } catch(err){
      console.log(err)
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalState.newAppointment}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalState.newAppointment}>
          <Box sx={style}>
            <div className="newApp mb-3 pb-2  border-b-[1px] border-[#ebebeb]">
              <h1 className="">Add Appointment</h1>
            </div>
            <div className=" Modal w-[80%] ml-auto mr-auto">
              <div className="newApp pb-2 mb-3 border-b-[1px] border-[#ebebeb]">
                <h2> Patients Personal Details</h2>
                <input
                  className="block m-2 ml-0"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className="block m-2 ml-0"
                  type="text"
                  placeholder="ID"
                  onChange={(e) => setID(e.target.value)}
                />
                <input
                  className="block m-2 ml-0"
                  type="number"
                  placeholder="phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="newApp pb-2 mb-3 border-b-[1px] border-[#ebebeb]">
                <h2>Date</h2>
                <input
                  id="date"
                  className="block m-2 w-[220px]"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="newApp pb-2 mb-3 border-b-[1px] border-[#ebebeb]">
                <h2 className="mb-2">Type</h2>
                <DropDown />
              </div>
              <div className="newApp pb-2 mb-3">
                <h2 className="mb-2">Description</h2>
                <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
              </div>
            </div>
            <button
              id="schedule"
              className="block m-0.5"
              onClick={() => schedule()}
            >
              Schedule
            </button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}






