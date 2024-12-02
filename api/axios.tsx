import axios from "axios";

const instance = axios.create({
  //baseURL: "http://43.203.221.199:3000",
  baseURL: "https://api.majorinstareference.com",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "https://api.majorinstareference.com",
  },
});

instance.interceptors.request.use(
  // 요청이 전달되기 전에 작업 수행
  (config) => {
    console.log("[+] 요청 전달 이전에 수행이 됩니다. ", config);
    return config;
  },
  // 요청 오류가 있는 작업 수행
  (error) => {
    console.log("[-] 요청 중 오류가 발생되었을때 수행이 됩니다. ", error);
    return Promise.reject(error);
    // eslint-disable-next-line prettier/prettier
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(
      "[+] 응답이 정상적으로 수행된 경우 수행이 됩니다. ",
      // eslint-disable-next-line prettier/prettier
      response
    );
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  async (error) => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    console.log("[-] 응답 중 오류가 발생되었을때 수행이 됩니다. ", error);
    // error 코드 401 일때 발생 - 유효한 token이 아닌 경우, token이 만료되었을 때
    if (error.status === 401) {
      // 토큰 리프레쉬
      return await instance.get("/users/refresh-token").then(async (res) => {
        //console.log("[-] 리프레쉬가 성공했을 때 수행이 됩니다. ", res);
        if (res.status === 200 && res.data.accessToken) {
          // 리프레쉬 성공시 이전 요청 재요청
          return instance(error.config);
        }
      });
    }

    // error 코드 400 일때 발생 - 토큰이 없거나 로그인 정보가 틀렸을 때
    if (
      error.status === 400 &&
      error.response.data.message === "토큰이 없습니다."
    ) {
      const user = localStorage.getItem("user-storage");
      console.log(user);
    }

    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
    // eslint-disable-next-line prettier/prettier
  }
);

export default instance;
