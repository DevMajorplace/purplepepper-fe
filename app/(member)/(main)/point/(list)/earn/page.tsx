"use client";

import { useEffect, useState } from "react";

import PointListItem from "../../../_components/PointListItem";

const DEFAULT = [
  {
    idx: "idx1",
    type: "적립",
    content: "미션 등록",
    detail: "[SHARE] 쥬베룩 몬스터의원 예약 미션생성시 포인트 사용",
    point: 9702,
    createdAt: new Date("2024-10-07 11:22:45"),
  },
  {
    idx: "idx2",
    type: "적립",
    content: "미션 등록",
    detail: "[QUIZ] 부산 송정 맛집 어부의 술상 미션생성시 포인트 사용",
    point: 6930,
    createdAt: new Date("2024-10-07 11:21:45"),
  },
  {
    idx: "idx3",
    type: "적립",
    content: "미션 등록",
    detail: "[SHARE] 부산보청기 포낙보청기 부산서면 미션생성시 포인트 사용",
    point: 4158,
    createdAt: new Date("2024-10-07 11:20:45"),
  },
  {
    idx: "idx4",
    type: "적립",
    content: "포인트 충전",
    detail: "캐시 충전",
    point: 300000,
    createdAt: new Date("2024-10-06 11:22:45"),
  },
  {
    idx: "idx5",
    type: "적립",
    content: "환불",
    detail: "[QUIZ] 신촌 술집 미션종료 잔여 포인트 환불",
    point: 716,
    createdAt: new Date("2024-10-04 11:22:45"),
  },
  {
    idx: "idx6",
    type: "적립",
    content: "환불",
    detail: "[QUIZ] 연남동 잼잼 미션종료 잔여 포인트 환불",
    point: 9748,
    createdAt: new Date("2024-10-02 11:22:45"),
  },
];

export default function PointEarnList() {
  const [list, setList] = useState(DEFAULT);

  useEffect(() => {
    setList(DEFAULT);
  }, []);

  return (
    <>
      {list.map((item) => (
        <PointListItem key={item.idx} {...item} />
      ))}
    </>
  );
}
