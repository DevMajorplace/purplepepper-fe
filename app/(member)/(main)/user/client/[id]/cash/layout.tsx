"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { useId } from "@/contexts/IdContext";

export default function ClientCashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const id = useId();
  const pathname = usePathname();

  return (
    <div>
      {/* 캐시 내역*/}
      <div>
        <div className="border-b border-gray-200 flex mb-5 [&_.selected]:text-[#333] [&_.selected]:font-bold [&_.selected]:border-b-2 [&_.selected]:border-[#666]">
          <Link href={`/user/client/${id}/cash/usage`}>
            <div
              className={`${pathname.includes("usage") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="usage"
            >
              이용 내역
            </div>
          </Link>
          <Link href={`/user/client/${id}/cash/charge`}>
            <div
              className={`${pathname.includes("charge") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="charge"
            >
              충전 내역
            </div>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
