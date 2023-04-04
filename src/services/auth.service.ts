import axios, { AxiosResponse } from "axios";

const API_URL = process.env.URL_ENDPOINT || "http://localhost:3001";

const register = (
  username: string,
  pwd: string
): Promise<AxiosResponse<any, any>> => {
  return axios.post(API_URL + "/register", {
    username,
    pwd,
  });
};

const login = (user: string, pwd: string): Promise<AxiosResponse<any, any>> => {
  return axios.post(API_URL + "/api/v1/auth", {
    user,
    pwd,
  });
};

const logout = (): Promise<AxiosResponse<any, any>> => {
  return axios.post(API_URL + "/logout");
};

const getCurrentUser = (): Promise<AxiosResponse<any, any>> => {
  return axios.get(API_URL + "/user");
};

const refreshToken = (): Promise<AxiosResponse<any, any>> => {
  return axios.get(API_URL + "/refresh-token");
};

const AuthServices = {
  register,
  login,
  logout,
  getCurrentUser,
  refreshToken,
};

export default AuthServices;
