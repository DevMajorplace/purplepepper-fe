import axios from "axios";

const instance = axios.create({
  //baseURL: "http://43.203.221.199:3000",
  baseURL: "https://api.majorinstareference.com",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "https://api.majorinstareference.com",
  },
});

export const AxiosInterceptor = (props: any) => {
  console.log("axios");
  instance.interceptors.request.use(
    // token refresh
    async (config) => {
      const newConfig = { ...config };
      console.log(newConfig);

      return await instance.get("/user/refresh");
    },

    async (error) => {
      return await Promise.reject(error);
      // eslint-disable-next-line prettier/prettier
    }
  );

  return props.children;
};

export default instance;
