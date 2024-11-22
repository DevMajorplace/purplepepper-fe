"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import Card from "@/components/card";
import { Suspense } from "react";

export default function MoneyPointLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Suspense>
      <Card className="min-h-[87vh] gap-5">
        {/* 포인트 내역 */}
        <div>
          <div className="border-b border-gray-200 flex mb-5 [&_.selected]:text-[#333] [&_.selected]:font-bold [&_.selected]:border-b-2 [&_.selected]:border-[#666]">
            <Link href={`/money/point/earn`}>
              <div
                className={`${pathname.includes("earn") ? "selected" : ""} py-3 px-7 cursor-pointer text-[#999] transition duration-200`}
                data-category="earn"
              >
                적립 내역
              </div>
            </Link>
            <Link href={`/money/point/withdrawal`}>
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
      </Card>
    </Suspense>
  );
}
