import axios from "axios"

const api = axios.create({
  baseURL: "http://10.76.145.1:8000/api",
  withCredentials: true, // cookies ke liye IMPORTANT
})

export default api