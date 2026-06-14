import axios from "axios";
import { storageKeys } from "@/lib/storageKeys";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(storageKeys.authToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem(storageKeys.authToken);
      localStorage.removeItem(storageKeys.user);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
