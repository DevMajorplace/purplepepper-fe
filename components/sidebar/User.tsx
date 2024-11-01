import { useRouter } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useCookies } from "react-cookie";

import { useUser } from "@/stores/auth.store";
import useStore from "@/hooks/useStore";

export default function User() {
  const user = useStore(useUser, (state) => {
    return state.user;
  });
  const { logout } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();

  const handleLogout = () => {
    // user store 초기화
    logout();
    // localStorage 삭제
    localStorage.removeItem("user-storage");
    // 토큰 쿠키 삭제
    removeCookie("token", {
      path: "/",
    });
    // 메인페이지로 이동
    router.push("/login");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">{user?.company}</div>
        <div className="text-xl flex gap-3 *:cursor-pointer">
          <AiOutlineSetting />
          <FiLogOut onClick={handleLogout} />
        </div>
      </div>
      {user?.level === 2 && (
        <div className="flex justify-between items-center font-medium pt-3">
          <div>보유포인트</div>
          <div>{user?.point.toLocaleString()}P</div>
        </div>
      )}
    </div>
  );
}
