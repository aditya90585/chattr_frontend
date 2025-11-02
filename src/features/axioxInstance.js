import axios from "axios";

const axiosInstance = axios.create({
  baseURL:"https://chattr-backend-m4zf.onrender.com/api/v1",
  withCredentials: true
});

export default axiosInstance