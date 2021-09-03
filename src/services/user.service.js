import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:7070/auth/";

const getUserDetails = () => {
  return axios.get(API_URL + "account");
};



export default {
    getUserDetails,
};