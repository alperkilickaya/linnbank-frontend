import axios from "axios";
import authHeader from "./auth-header.js";

const API_URL = "http://localhost:7070/";

const ApiService = axios.create({
    baseURL: API_URL
});

ApiService.interceptors.request.use( (config) => {
      const token = authHeader();
      //console.log('auth kismi',token);
      config.headers["Authorization"] = token;
      //console.log('config kismi',config.headers["Authorization"]);
      return config;
    }
);

ApiService.interceptors.response.use( 
    (response)=> {
      //console.log("!!!!!!!!!!!!!",response);
      //response.headers["Authorization"] = response.config.headers.Authorization
      //response.config.headers.Authorization
      return response
    },
    (error) => {
      throw(error);
    }
);

export default ApiService;