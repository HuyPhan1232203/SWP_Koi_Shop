import axios from "axios";


const api = axios.create({
    baseURL: 'http://103.200.20.221:8080/api/',
    // baseURL: 'http://14.225.206.168:8080/api/',
  });

  const handleBefore = (config) => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  };
  
  const handleError = (error) => {
    console.log(error);
  };
  
  api.interceptors.request.use(handleBefore, handleError);

  export default api;