import axios from "axios";
import AuthService from "./auth.services";
import { API_HOST } from "../config/constant";

const userAxios = axios.create({
  baseURL: `${API_HOST}/my-files`,
})

userAxios.interceptors.request.use(
  (config) => {
    const accessToken = AuthService.getCurrentUser().accessToken;
    if (accessToken) {
      config.headers["x-access-token"] = accessToken;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

userAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log(err.response);
    const currentUser = AuthService.getCurrentUser();
    const originalReq = err.config;
    if (
      currentUser.refreshToken &&
      err.response.status === 401 &&
      !originalReq._retry
    ) {
      originalReq._retry = true;
      return axios
        .post(`${API_HOST}/user/refresh-token`, {
          refreshToken: currentUser.refreshToken,
        })
        .then((res) => {
          const { accessToken } = res.data;
          currentUser.accessToken = accessToken;
          localStorage.setItem("user", JSON.stringify(currentUser));
          return axios(originalReq);
        });
    }
    return Promise.reject(err);
  }
);

const getUserFiles = () => {
  return userAxios.get(`${API_HOST}/my-files`);
};

const createFolder = (folderName, folder) => {
  return userAxios.post(`${API_HOST}/my-files/folders`, {
    parent: folder,
    folderName: folderName,
  });
};

const openFolder = (folder) => {
  return userAxios.get(`${API_HOST}/my-files/folders/${folder}`);
};

const saveFile = (data, folder, fileName) => {
  return userAxios.post(`${API_HOST}/my-files/files`, {
    data: data,
    parent: folder,
    fileName: fileName,
  });
};

export default {
  getUserFiles,
  createFolder,
  openFolder,
  saveFile,
};
