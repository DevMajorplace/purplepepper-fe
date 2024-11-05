"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "@/stores/auth.store";

export interface idUser extends User {
  id: string;
  password: string;
  memo: string;
  use: boolean;
  account: {
    bank: string;
    accountNumber: string;
    depositor: string;
  };
  recommendId?: string;
}

type context = {
  id: number;
  idUser: idUser;
};

interface IdContextProviderProps {
  id: number;
  children: ReactNode;
}

const IdContext = createContext<context | undefined>(undefined);

const DEFAULT_IDUSER: idUser = {
  id: "",
  password: "",
  company: "", // 업체명
  name: "", // 담당자면
  phone: "", // 담당자 연락처
  point: 0, // 포인트 (출금 가능)
  cash: 0, // 캐시 (충전)
  level: 1,
  memo: "",
  use: true, // 사용 여부
  account: {
    // 계좌 정보
    bank: "KEB하나은행", // 계좌 은행 (디폴트 KEB하나은행)
    accountNumber: "", // 계좌 번호
    depositor: "", // 계좌 예금주
  },
  recommendId: "",
};

export function IdProvider({ id, children }: IdContextProviderProps) {
  const [idUser, setIdUser] = useState<idUser>(DEFAULT_IDUSER);

  useEffect(() => {
    setIdUser({
      id: "총판 ID",
      password: "총판 비밀번호",
      company: "총판명",
      name: "담당자명",
      phone: "담당자 연락처",
      point: 1000,
      cash: 12000,
      level: 3,
      memo: "",
      use: true,
      account: {
        bank: "",
        accountNumber: "",
        depositor: "",
      },
      recommendId: "admin",
    });
  }, []);

  return (
    <IdContext.Provider value={{ id, idUser }}>{children}</IdContext.Provider>
  );
}

export function useId() {
  const context = useContext(IdContext);

  if (!context) {
    throw new Error("반드시 IdProvider 안에서 사용해야 합니다");
  }

  const { id } = context;

  return id;
}

export function useIdUser() {
  const context = useContext(IdContext);

  if (!context) {
    throw new Error("반드시 IdProvider 안에서 사용해야 합니다");
  }

  const { idUser } = context;

  return idUser;
}
