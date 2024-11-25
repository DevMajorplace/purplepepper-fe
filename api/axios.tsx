import axios from "axios";

const instance = axios.create({
  //baseURL: "http://43.203.221.199:3000",
  baseURL: "api.majorinstareference.com",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "api.majorinstareference.com",
  },
});

export default instance;
