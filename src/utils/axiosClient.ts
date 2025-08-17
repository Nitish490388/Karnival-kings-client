import axios from "axios";
axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: "https://karnival-kings-server.onrender.com",
  withCredentials: true
});



export default axiosClient;


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
