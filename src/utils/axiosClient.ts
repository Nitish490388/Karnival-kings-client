import axios from "axios";
axios.defaults.withCredentials = true;

// const axiosClient = axios.create({
//   baseURL: "https://karnival-kings-server.onrender.com",
// });

const axiosClient = axios.create({
  baseURL: "/api",  // ✅ Now hits same domain as frontend
  withCredentials: true
});
// axiosClient.interceptors.request.use((config) => {
//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error.response);
//   }
// );

export default axiosClient;
