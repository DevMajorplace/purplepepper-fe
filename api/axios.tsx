import axios from "axios";

const instance = axios.create({
  //baseURL: "http://43.203.221.199:3000",
  baseURL: "https://majorinstareference.com",
  withCredentials: true,
});

export default instance;
