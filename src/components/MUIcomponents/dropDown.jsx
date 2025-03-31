import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { newAppointment } from "../../store/newAppointmentStore";

export default function DropDown(props) {
  const [Appointment, setAppointment] = useState("");
  const setType = newAppointment((state)=> state.setType)
  const setBackgroundColor = newAppointment((state) => state.setBgColor);
  const setBorderColor = newAppointment((state) => state.setBorder);
  const yellow = "#c7b654";
  const green = "#5eb571";

  const handleChange = (e) => {
    console.log(e.target.value)
    setAppointment(e.target.value);
    setType(e.target.value);
    if(e.target.value === 'follow up'){
      setBackgroundColor(yellow);
      setBorderColor(yellow)
    }else{
      setBackgroundColor(green);
      setBorderColor(green);
    }
  };

  return (
    <FormControl sx={{ m:0.3, ml:0, minWidth: "100%" }} size="small">
      <InputLabel id="demo-select-small-label">Appointment</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={Appointment}
        label="Appointment"
        onChange={(e)=>{handleChange(e)}}
      >
        <MenuItem value="consult">Consult</MenuItem>
        <MenuItem value= "follow up">Follow Up</MenuItem>
      </Select>
    </FormControl>
  );
}
