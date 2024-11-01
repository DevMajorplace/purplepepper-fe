"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { useId } from "@/contexts/IdContext";

export default function ClientMissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const id = useId();
  const pathname = usePathname();

  return (
    <div>
      {/* 미션 내역*/}
      <div>
        <div className="border-b border-gray-200 flex mb-5 [&_.selected]:text-[#333] [&_.selected]:font-bold [&_.selected]:border-b-2 [&_.selected]:border-[#666]">
          <Link href={`/user/client/${id}/mission/list`}>
            <div
              className={`${pathname.includes("list") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="list"
            >
              미션 목록
            </div>
          </Link>
          <Link href={`/user/client/${id}/mission/statistics`}>
            <div
              className={`${pathname.includes("statistics") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="statistics"
            >
              미션 통계
            </div>
          </Link>
          <Link href={`/user/client/${id}/mission/participant`}>
            <div
              className={`${pathname.includes("participant") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="participant"
            >
              미션 참여자 내역
            </div>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
