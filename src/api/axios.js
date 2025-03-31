import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5500",
});

export const axiosPrivate =  axios.create({
  baseURL: "http://localhost:5500",
  headers: {"Content-Type": "application/json"},
  withCredentials: true
});
