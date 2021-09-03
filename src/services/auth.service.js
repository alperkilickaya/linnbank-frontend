import axios from "axios";

const API_URL = "http://localhost:7070/auth/";

class service {
   register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  };
  
   login = (username, password) => {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data.jwt));
        }
  
        return response.data;
      });
  };
  
   logout = () => {
    localStorage.removeItem("user");
  };


}



export default new service();
