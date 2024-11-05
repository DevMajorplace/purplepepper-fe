"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import Card from "@/components/card";

export default function MoneyCashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Card className="min-h-[87vh] gap-5">
      {/* 캐시 내역*/}
      <div>
        <div className="border-b border-gray-200 flex mb-5 [&_.selected]:text-[#333] [&_.selected]:font-bold [&_.selected]:border-b-2 [&_.selected]:border-[#666]">
          <Link href={`/money/cash/usage`}>
            <div
              className={`${pathname.includes("usage") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="usage"
            >
              이용 내역
            </div>
          </Link>
          <Link href={`/money/cash/charge`}>
            <div
              className={`${pathname.includes("charge") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
              data-category="charge"
            >
              충전 요청 내역
            </div>
          </Link>
        </div>
        {children}
      </div>
    </Card>
  );
}
