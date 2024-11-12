"use client";

import Link from "next/link";
import { useStore } from "zustand";
import { usePathname } from "next/navigation";
import { PiHandCoins } from "react-icons/pi";

import CashChargeModal from "./_components/CashChargeModal";

import Card from "@/components/card";
import { useUser } from "@/stores/auth.store";
import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function CashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useStore(useUser, (state) => {
    return state.user;
  });
  const pathname = usePathname();
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  const handleCashCharge = () => {
    setModalOpen(true);
    setModalContents(<CashChargeModal user={user} />);
  };

  return (
    <Card className="min-h-[87vh] gap-5">
      {/* 보유 캐시 */}
      <div className="flex justify-between items-center p-4 px-8 border border-[#dfdfdf] rounded-lg mb-6">
        <div>
          <div>현재 보유 캐시</div>
          <div className="text-[24px] font-bold mt-2">
            {user.point.toLocaleString()} 캐시
          </div>
        </div>
        <div
          className="px-5 py-3 bg-[#000] text-white rounded-lg cursor-pointer flex items-center gap-1 hover:bg-[#000]/80"
          role="presentation"
          onClick={handleCashCharge}
        >
          <PiHandCoins className="text-[18px] pt-[1px]" /> 캐시 충전하기
        </div>
      </div>
      {/* 캐시 내역*/}
      <div>
        <div className="border-b border-gray-200 flex mb-5 [&_.selected]:text-[#333] [&_.selected]:font-bold [&_.selected]:border-b-2 [&_.selected]:border-[#666]">
          <Link href={`/cash/usage`}>
            <div
              className={`${pathname.includes("usage") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="usage"
            >
              이용 내역
            </div>
          </Link>
          <Link href={`/cash/charge`}>
            <div
              className={`${pathname.includes("charge") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="charge"
            >
              충전 내역
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </Card>
  );
}
