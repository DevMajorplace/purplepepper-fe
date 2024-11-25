import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { useCookies } from "react-cookie";
import { useStore } from "zustand";

import { useUser } from "@/stores/auth.store";
import instance from "@/api/axios";

export default function User() {
  const user = useStore(useUser, (state) => {
    return state.user;
  });
  const { logout } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies([
    "isLogin",
    "access_token",
    "refresh_token",
  ]);
  const router = useRouter();

  const handleLogout = async () => {
    // 로그아웃 요청
    await instance.post("/user/logout");

    // user store 초기화
    logout();
    // localStorage 삭제
    localStorage.removeItem("user-storage");
    // 토큰 쿠키 삭제
    removeCookie("isLogin", {
      path: "/",
    });
    removeCookie("access_token", {
      path: "/",
    });
    removeCookie("refresh_token", {
      path: "/",
    });
    // 메인페이지로 이동
    router.push("/login");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">{user.company}</div>
        <div className="text-xl flex gap-3 *:cursor-pointer">
          <FiLogOut onClick={handleLogout} />
        </div>
      </div>
      {user?.level === 2 && (
        <div className="flex justify-between items-center font-medium pt-3">
          <div>보유포인트</div>
          <div>{user.point.toLocaleString()}P</div>
        </div>
      )}
    </div>
  );
}
