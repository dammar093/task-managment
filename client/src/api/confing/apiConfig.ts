import axios from "axios";
const token = localStorage.getItem("token") || "";


// Create an axios instance with the base URL and headers
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
