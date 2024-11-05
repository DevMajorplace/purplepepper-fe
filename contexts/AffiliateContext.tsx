"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface affiliate {
  affiliateName: string; // 매체사명
  name: string; // 담당자명
  phone: string; // 담당자 연락처
  apiKey: string; // API KEY
  memo: string; // 관리자 메모
  use: boolean; // 사용 여부
  develop: boolean; // 개발 여부
  depositPrice: { name: string; value: number }[];
}

type context = {
  idx: string;
  affiliate: affiliate;
};

interface AffiliateContextProviderProps {
  idx: string;
  children: ReactNode;
}

const AffiliateContext = createContext<context | undefined>(undefined);

const DEFAULT: affiliate = {
  affiliateName: "", // 매체사명
  name: "", // 담당자명
  phone: "", // 담당자 연락처
  apiKey: "", // API KEY
  memo: "", // 관리자 메모
  use: true, // 사용 여부
  develop: true, // 개발 여부
  depositPrice: [],
};

export function AffiliateProvider({
  idx,
  children,
}: AffiliateContextProviderProps) {
  const [affiliate, setAffiliate] = useState<affiliate>(DEFAULT);

  useEffect(() => {
    setAffiliate({
      affiliateName: "매체사명", // 매체사명
      name: "담당자명", // 담당자명
      phone: "담당자 연락처", // 담당자 연락처
      apiKey: "API KEY", // API KEY
      memo: "", // 관리자 메모
      use: true, // 사용 여부
      develop: true, // 개발 여부
      depositPrice: [
        {
          name: "category1",
          value: 10,
        },
        {
          name: "category2",
          value: 30,
        },
        {
          name: "category3",
          value: 50,
        },
      ],
    });
  }, []);

  return (
    <AffiliateContext.Provider value={{ idx, affiliate }}>
      {children}
    </AffiliateContext.Provider>
  );
}

export function useIdx() {
  const context = useContext(AffiliateContext);

  if (!context) {
    throw new Error("반드시 AffiliateProvider 안에서 사용해야 합니다");
  }

  const { idx } = context;

  return idx;
}

export function useAffiliate() {
  const context = useContext(AffiliateContext);

  if (!context) {
    throw new Error("반드시 AffiliateProvider 안에서 사용해야 합니다");
  }

  const { affiliate } = context;

  return affiliate;
}
