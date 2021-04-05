import axios from "axios";
import { API_HOST } from "../config/constant";

const register = (username, password) => {
  return axios.post(`${API_HOST}/user/signup`, {
    username,
    password
  });
};

const login = (username, password) => {
  return axios
    .post(`${API_HOST}/user/signin`, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.assign("http://localhost:3000/");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};