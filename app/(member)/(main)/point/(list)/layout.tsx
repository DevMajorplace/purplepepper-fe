"use client";

import Link from "next/link";
import { useStore } from "zustand";
import { usePathname } from "next/navigation";
import { PiHandCoins } from "react-icons/pi";

import PointWithdrawalModal from "./_components/PointWithdrawalModal";

import Card from "@/components/card";
import { useUser } from "@/stores/auth.store";
import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function PointListLayout({
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

  const handlePointWithdrawal = () => {
    if (!user.isAccount) {
      alert("내 정보에서 출금 계좌 정보를 입력해주세요.");

      return false;
    }

    setModalOpen(true);
    setModalContents(<PointWithdrawalModal user={user} />);
  };

  return (
    <Card className="min-h-[86vh] pt-6 pb-10">
      {/* 포인트 관리 상단 */}
      <div className="flex justify-between items-center p-4 px-8 border border-[#dfdfdf] rounded-lg mb-6">
        <div>
          <div>현재 보유 포인트</div>
          <div className="text-[24px] font-bold mt-2">
            {user.point.toLocaleString()}P
          </div>
        </div>
        <div
          className="px-5 py-3 bg-[#000] text-white rounded-lg cursor-pointer flex items-center gap-1 hover:bg-[#000]/80"
          role="presentation"
          onClick={handlePointWithdrawal}
        >
          <PiHandCoins className="text-[18px] pt-[1px]" /> 포인트 출금신청
        </div>
      </div>
      {/* 포인트 관리 내역*/}
      <div>
        <div className="border-b border-gray-200 flex mb-5 *:cursor-pointer *:text-[#999] *:transition *:duration-200 [&_.selected]:text-[#333] [&_.selected]:font-bold [&_.selected]:border-b-2 [&_.selected]:border-[#666]">
          <Link href={`/point/earn`}>
            <div
              className={`${pathname.includes("earn") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="earn"
            >
              적립 내역
            </div>
          </Link>
          <Link href={`/point/withdrawal`}>
            <div
              className={`${pathname.includes("withdrawal") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="withdrawal"
            >
              출금 내역
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </Card>
  );
}
