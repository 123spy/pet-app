import axios from 'axios';
import {message} from "antd";

// axios.defaults.baseURL = 'https://pet-server-e6yo.onrender.com';
axios.defaults.baseURL = 'https://pet-server-e6yo.onrender.com';

axios.defaults.withCredentials = true;


axios.interceptors.request.use(function (config) {

  return config;
}, function (error) {

  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  if(response.status !== 200) {
    message.error("network error");
  }
  return response?.data;
}, function (error) {
  return Promise.reject(error);
});

export default axios;
