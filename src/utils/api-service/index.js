import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:7070/auth/";

const ApiService = axios.create({
    baseURL: API_URL
});

ApiService.interceptors.request.use( (config) => {
      const token = authHeader();
      config.headers["Authorization"] = token;
      return config;
    }
);

ApiService.interceptors.response.use( 
    (response)=> {
      return response
    },
    (error) => {
      throw(error);
    }
);

export default ApiService;