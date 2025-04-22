import axios from "axios";

export default axios.create({
  baseURL: "https://appointment-api-production-5b4f.up.railway.app/",
});

export const axiosPrivate =  axios.create({
  baseURL: "https://appointment-api-production-5b4f.up.railway.app/",
  headers: {"Content-Type": "application/json"},
  withCredentials: true
});
