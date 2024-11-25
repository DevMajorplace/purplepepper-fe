import axios from "axios";

const instance = axios.create({
  //baseURL: "http://43.203.221.199:3000",
  baseURL: "https://api.majorinstareference.com",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "https://api.majorinstareference.com",
  },
});

export default instance;
