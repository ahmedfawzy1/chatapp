import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.NODE_ENV === "development" ? `${import.meta.env.VITE_BASE_URL}/api` : "/api",
  withCredentials: true,
});
