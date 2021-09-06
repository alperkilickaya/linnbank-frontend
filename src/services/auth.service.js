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
          localStorage.setItem("token", JSON.stringify(response.data.jwt));
        }  
        return response.data;
      });
  };

  
    getInfo = () => {
       const token = JSON.parse(localStorage.getItem('token'));
      return axios.post(API_URL + "getUserInfo",{
        "jwt":token
      }
      ).then((response) => { 
        localStorage.setItem("ssn", JSON.stringify(response.data.userDAO.ssn));
        localStorage.setItem("firstName", JSON.stringify(response.data.userDAO.firstName));
        localStorage.setItem("lastName", JSON.stringify(response.data.userDAO.lastName));
        localStorage.setItem("address", JSON.stringify(response.data.userDAO.address));
        localStorage.setItem("mobilePhoneNumber", JSON.stringify(response.data.userDAO.mobilePhoneNumber));
        localStorage.setItem("email", JSON.stringify(response.data.userDAO.email));
        console.log('deneme',response.data.userDAO.ssn);
        return response.data;
      });
  };
  
   logout = () => {
    localStorage.removeItem("user");
  };


}



export default new service();
