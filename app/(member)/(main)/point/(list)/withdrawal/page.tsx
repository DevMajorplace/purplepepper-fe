"use client";

import { useEffect, useState } from "react";

import PointListItem from "../../../_components/PointListItem";

const DEFAULT = [
  {
    idx: "idx1",
    type: "대기",
    content: "출금 대기",
    point: 9702,
    createdAt: new Date("2024-10-07 11:22:45"),
  },
  {
    idx: "idx2",
    type: "승인",
    content: "출금 완료",
    point: 6930,
    createdAt: new Date("2024-10-07 11:21:45"),
  },
  {
    idx: "idx3",
    type: "승인",
    content: "출금 완료",
    point: 4158,
    createdAt: new Date("2024-10-07 11:20:45"),
  },
  {
    idx: "idx4",
    type: "거절",
    content: "출금 거절",
    point: 300000,
    createdAt: new Date("2024-10-06 11:22:45"),
  },
  {
    idx: "idx5",
    type: "거절",
    content: "출금 거절",
    point: 716,
    createdAt: new Date("2024-10-04 11:22:45"),
  },
  {
    idx: "idx6",
    type: "승인",
    content: "출금 완료",
    point: 9748,
    createdAt: new Date("2024-10-02 11:22:45"),
  },
];

export default function PointWithdrawalList() {
  const [list, setList] = useState(DEFAULT);

  useEffect(() => {
    setList(DEFAULT);
  }, []);

  return (
    <>
      {list.map((item) => (
        <PointListItem key={item.idx} {...item} listType={"withdrawal"} />
      ))}
    </>
  );
}
