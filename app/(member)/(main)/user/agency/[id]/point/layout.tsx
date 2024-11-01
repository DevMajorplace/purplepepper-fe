"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { useId, useIdUser } from "@/contexts/IdContext";

export default function AgencyPointLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const id = useId();
  const idUser = useIdUser();
  const pathname = usePathname();

  return (
    <div>
      {/* 포인트 관리 상단 */}
      <div className="flex justify-between items-center p-4 px-8 border border-[#dfdfdf] rounded-lg mb-6">
        <div>
          <div>보유 포인트</div>
          <div className="text-[24px] font-bold mt-2">
            {idUser && idUser.point.toLocaleString()}P
          </div>
        </div>
      </div>
      {/* 포인트 관리 내역*/}
      <div>
        <div className="border-b border-gray-200 flex mb-5 [&_.selected]:text-[#333] [&_.selected]:font-bold [&_.selected]:border-b-2 [&_.selected]:border-[#666]">
          <Link href={`/user/agency/${id}/point/earn`}>
            <div
              className={`${pathname.includes("earn") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="earn"
            >
              적립 내역
            </div>
          </Link>
          <Link href={`/user/agency/${id}/point/withdrawal`}>
            <div
              className={`${pathname.includes("withdrawal") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="withdrawal"
            >
              출금 내역
            </div>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
