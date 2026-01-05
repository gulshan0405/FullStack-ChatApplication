import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backend-chatty-da8f.onrender.com/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers["auth-token"] = token;
    }
    return config;
});