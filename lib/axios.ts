import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

// 요청/응답 인터셉터
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // 요청 전 수행할 작업
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
