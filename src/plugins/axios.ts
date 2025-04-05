import axios from 'axios';
import {message} from "antd";

axios.defaults.baseURL = 'http://localhost:3001';

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
