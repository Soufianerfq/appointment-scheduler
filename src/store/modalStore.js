import { create } from "zustand";

export const ModalState = create((set) => ({
    isOpen:{
        newAppointment: false,
        event: false,
        date: false
    },
    setNewAppointment: (value) => set((state)=> ({isOpen: {...state.isOpen, newAppointment:value}})),
    setEvent: (value) => set((state)=> ({isOpen: {...state.isOpen, event:value}})),
}))