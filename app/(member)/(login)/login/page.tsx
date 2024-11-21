"use client";

import { useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import InputWrap from "../_components/InputWrap";
import FormPart from "../_components/FormPart";
import FormWrap from "../_components/FormWrap";

import { User, useToken, useUser } from "@/stores/auth.store";
import admin from "@/public/dummy/admin.json";
import distributor from "@/public/dummy/distributor.json";
import advertiser from "@/public/dummy/advertiser.json";

export default function Login() {
  const [login, setLogin] = useState({
    id: "",
    password: "",
  });
  const [isRemember, setIsRemember] = useState(false);
  const { setToken } = useToken();
  const { setUser, setIsLogin } = useUser();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(["isLogin"]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      //const res = await axios.get("/dummy/admin.json");
      // zustand store에 토큰 정보 저장
      //let token = "";
      let user = [] as any;

      if (login.id === "admin1234") {
        //token = token;
        user = admin.user;
      } else if (login.id === "test1") {
        //token = distributor.token;
        user = distributor.user;
      } else if (login.id === "test2") {
        //token = advertiser.token;
        user = advertiser.user;
      } else {
        return false;
      }

      const response = await axios.post(
        "http://43.203.221.199:3000/user/login",
        {
          user_id: login.id,
          password: login.password,
        },
        {
          withCredentials: true,
          // eslint-disable-next-line prettier/prettier
        }
      );

      setToken(response.data.accessToken);
      setUser(isRemember, user as User);
      setIsLogin(true);

      // 쿠키에 토큰 저장
      setCookie("isLogin", true, {
        path: "/",
      });
      router.push("/dashboard");
    } catch (error: any) {
      //console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <FormWrap title="로그인">
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormPart>
          <div className="relative mb-1">
            <InputWrap
              label={"아이디"}
              name={"id"}
              placeholder={"아이디를 입력해주세요."}
              type={"text"}
              value={login.id}
              onChange={handleInput}
            />
            <Link
              className="cursor-pointer text-[#666] absolute right-0 top-0 underline"
              href={"/find-id"}
              tabIndex={-1}
            >
              아이디를 잊으셨나요?
            </Link>
          </div>
          <div className="relative mb-2">
            <InputWrap
              label={"비밀번호"}
              name={"password"}
              placeholder={"비밀번호를 입력해주세요."}
              type={"password"}
              value={login.password}
              onChange={handleInput}
            />
            <Link
              className="cursor-pointer text-[#666] absolute right-0 top-0 underline"
              href={"/find-password"}
              tabIndex={-1}
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                checked={isRemember}
                className=""
                id="isRemember"
                type="checkbox"
                onChange={() => setIsRemember(!isRemember)}
              />
              <label htmlFor="isRemember">로그인 상태 유지</label>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <button
              className="w-full h-12 bg-navy-800 hover:bg-navy-900 text-white text-center content-center rounded-md cursor-pointer"
              type={"submit"}
            >
              로그인
            </button>
            <Link
              className="block w-full h-12 border border-navy-800 hover:bg-[#fbfcff] text-navy-800 text-center content-center rounded-md cursor-pointer"
              href={"/register"}
            >
              <div>회원가입</div>
            </Link>
          </div>
        </FormPart>
      </form>
    </FormWrap>
  );
}
