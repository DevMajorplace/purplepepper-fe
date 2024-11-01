import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useToken } from "@/stores/auth.store";

export default function useAuth() {
  const auth = useToken();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(["token"]);

  //const tokenLogin = async () => {}

  useEffect(() => {
    // 회원 스토어에 정보가 없을때
    if (!auth.token) {
      // 쿠키 데이터가 있을때 쿠키 토큰으로 토큰로그인
      if (cookies.token) {
      }
    }
  }, [auth.token, cookies.token]);
}
