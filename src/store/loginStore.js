import { create } from "zustand";

export const useLoginStore = create((set) => ({
  logins: {
    username: "",
    password: "",
    accessToken: "",
    roles: [],
    persiste: JSON.parse(localStorage.getItem("persist")) || false,
  },
  setUsername: (value) =>
    set((state) => ({ logins: { ...state.logins, username: value } })),
  setpassword: (value) =>
    set((state) => ({ logins: { ...state.logins, password: value } })),
  setAccessToken: (value) =>
    set((state) => ({ logins: { ...state.logins, accessToken: value } })),
  setRoles: (value) =>
    set((state) => ({ logins: { ...state.logins, roles: value } })),
  setPersiste: (value) =>
    set((state) => ({ logins: { ...state.logins, persiste: value } })),
}));
