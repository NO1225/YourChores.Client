const API_URL = "http://192.168.8.100:5001/";

module.exports = {

    register: API_URL + "api/auth/register",
    login: API_URL + "api/auth/login",
    tokenLogin : API_URL + "api/auth/tokenlogin",

}