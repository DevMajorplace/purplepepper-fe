import axios from "axios";

const instance = axios.create({
  //baseURL: "http://43.203.221.199:3000",
  baseURL: "http://192.168.1.13:3000/",
  withCredentials: true,
});

export default instance;
