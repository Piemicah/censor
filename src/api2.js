import axios from "axios";

const api2 = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default api2;
