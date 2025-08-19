import axios from "axios";
import { getItem } from "./localStorageManager";
axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: "https://karnival-kings-server.onrender.com",
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = getItem();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
