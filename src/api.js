import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
import api2 from "./api2";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const getToken = async () => {
  const result = await api2.get("/api/manage_tokens/");
  console.log({ xx: result.data });
  return result.data.token;
};

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
