import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});
