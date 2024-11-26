import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  company: string;
  id: string;
  name: string;
  point: number;
  cash?: number;
  role: string;
  isAccount?: boolean;
};
type UserProps = {
  isRemember: boolean;
  user: User;
  isLogin: boolean;
  setUser: (isRemember: boolean, user: User) => void;
  setIsLogin: (isLogin: boolean) => void;
  logout: () => void; // 로그아웃
};

const USER_DEFAULT = {
  company: "",
  id: "",
  name: "",
  point: 0,
  cash: 0,
  role: "client",
  isAccount: false,
};

export const useUser = create(
  persist<UserProps>(
    (set) => ({
      isRemember: false,
      user: USER_DEFAULT as User,
      isLogin: false,
      setUser: (isRemember: boolean, user: User) => {
        set(() => ({ isRemember, user }));
      },
      setIsLogin: (isLogin: boolean) => {
        set(() => ({ isLogin }));
      },
      logout: () => {
        set({ isLogin: false });
      },
    }),
    // eslint-disable-next-line prettier/prettier
    { name: "user-storage" }
    // eslint-disable-next-line prettier/prettier
  )
);
