import axiosInstance from "./axiosInstance";

const BASE_URL = "http://localhost:7070"

class registerLoginService {

    login (data) {
        return axiosInstance.post(BASE_URL + "/api/user/register" , data )
    }

}
 export default new registerLoginService();

