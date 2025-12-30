import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // cookies ke liye IMPORTANT
})

export default api