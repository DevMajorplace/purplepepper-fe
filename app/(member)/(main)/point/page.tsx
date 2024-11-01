"use client";

import { useState } from "react";
import Link from "next/link";

import PointListItem from "../_components/PointListItem";

import Card from "@/components/card";

const DEFAULT = [
  {
    id: 1,
    type: "사용",
    content: "미션 등록",
    detail: "[SHARE] 쥬베룩 몬스터의원 예약 미션생성시 포인트 사용",
    point: 9702,
    createdAt: new Date("2024-10-07 11:22:45"),
  },
  {
    id: 2,
    type: "사용",
    content: "미션 등록",
    detail: "[QUIZ] 부산 송정 맛집 어부의 술상 미션생성시 포인트 사용",
    point: 6930,
    createdAt: new Date("2024-10-07 11:21:45"),
  },
  {
    id: 3,
    type: "사용",
    content: "미션 등록",
    detail: "[SHARE] 부산보청기 포낙보청기 부산서면 미션생성시 포인트 사용",
    point: 4158,
    createdAt: new Date("2024-10-07 11:20:45"),
  },
  {
    id: 4,
    type: "충전",
    content: "포인트 충전",
    detail: "캐시 충전",
    point: 300000,
    createdAt: new Date("2024-10-06 11:22:45"),
  },
  {
    id: 5,
    type: "충전",
    content: "환불",
    detail: "[QUIZ] 신촌 술집 미션종료 잔여 포인트 환불",
    point: 716,
    createdAt: new Date("2024-10-04 11:22:45"),
  },
  {
    id: 6,
    type: "충전",
    content: "환불",
    detail: "[QUIZ] 연남동 잼잼 미션종료 잔여 포인트 환불",
    point: 9748,
    createdAt: new Date("2024-10-02 11:22:45"),
  },
];

export default function Point() {
  const [list, setList] = useState(DEFAULT);
  const [category, setCategory] = useState("usage");

  const handleCategoryClick = (e: any) => {
    const category = e.target.dataset.category;

    if (category) {
      setCategory(category);
      setList(DEFAULT);
    }
  };

  return (
    <Card className="min-h-[86vh] pt-6 pb-10">
      {/* 포인트 관리 상단 */}
      <div className="flex justify-between items-center p-4 px-8 border border-[#dfdfdf] rounded-lg mb-6">
        <div>
          <div>현재 보유 포인트</div>
          <div className="text-[24px] font-bold mt-2">
            {(200000).toLocaleString()}P
          </div>
        </div>
        <Link href={"/point/charge"}>
          <div className="px-5 py-3 bg-navy-800 text-white rounded-lg cursor-pointer hover:bg-navy-900">
            포인트 충전하기
          </div>
        </Link>
      </div>
      {/* 포인트 관리 내역*/}
      <div>
        <div
          className="border-b border-gray-200 flex mb-5 *:py-3 *:px-7 *:cursor-pointer *:text-[#999] *:transition *:duration-200 [&_.selected]:text-[#333] [&_.selected]:font-bold [&_.selected]:border-b-2 [&_.selected]:border-[#666]"
          role="presentation"
          onClick={(e) => handleCategoryClick(e)}
        >
          <div
            className={`${category === "usage" ? "selected" : ""}`}
            data-category="usage"
          >
            이용 내역
          </div>
          <div
            className={`${category === "payment" ? "selected" : ""}`}
            data-category="payment"
          >
            결제 내역
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {list.map((item) => (
            <PointListItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </Card>
  );
}
