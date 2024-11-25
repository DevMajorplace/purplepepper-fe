import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function useAuth() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(["token"]);

  //const tokenLogin = async () => {}

  useEffect(() => {}, []);
}
