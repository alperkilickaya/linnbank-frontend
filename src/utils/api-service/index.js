import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const ApiService = axios.create({
  baseURL: API_URL,
});

ApiService.interceptors.request.use((config) => {
  const token = authHeader();
  config.headers["Authorization"] = token;
  // console.log("Config", config);
  return config;
});

ApiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

export default ApiService;
