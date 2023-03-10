import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3333",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});
