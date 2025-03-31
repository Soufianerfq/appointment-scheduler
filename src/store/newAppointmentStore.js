import {create} from "zustand"

export const newAppointment = create((set)=>({
    event: {
        title: '',
        date: '',
        id: '',
        number: '',
        type: '',
        description: '',
        backgroundColor: '',
        borderColor: ''
    },
    setTitle: (value)=> set((state)=>({event: {...state.event, title:value}})),
    setDate: (value)=> set((state)=>({event: {...state.event, date:value}})),
    setID: (value)=> set((state)=>({event: {...state.event, id:value}})),
    setType: (value)=> set((state)=>({event: {...state.event, type:value}})),
    setPhone: (value)=> set((state)=>({event: {...state.event, phone:value}})),
    setDescription: (value)=> set((state)=>({event: {...state.event, description:value}})),
    setBgColor: (value)=> set((state)=>({event: {...state.event, backgroundColor:value}})),
    setBorder: (value)=> set((state)=>({event: {...state.event, borderColor:value}})),
}))