import { create } from "zustand";


export const DataStore = create((set) => ({
  events: [],
  clickedEvent: {},
  patients:[],
  setClickedEvent: (value) => set(() => ({ clickedEvent: {...value} })),
  setEvents: (value) => set(() => ({ events: [...value] })),
  setPatients: (value) => set(() => ({ events: [...value] })),
}));