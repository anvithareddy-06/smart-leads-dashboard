import axios from "axios";
baseURL: import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: "https://smart-leads-backend-6gd2.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;