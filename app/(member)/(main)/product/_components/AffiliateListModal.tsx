"use client";

import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { PiDownloadSimple } from "react-icons/pi";
import { RiRefreshLine } from "react-icons/ri";
import Link from "next/link";

import Pages from "@/components/Pages";
import CalendarInput, { dateFormat } from "@/components/Input/CalendarInput";
import TableSelect from "@/components/Select/TableSelect";
import useCustomParams from "@/hooks/useCustomParams";
import TableTh from "@/app/(member)/(main)/_components/TableTh";
import Table from "@/app/(member)/(main)/_components/Table";
import Card from "@/components/card";

type RowObj = {
  idx: string; // IDX
  affiliateName: string; // 매체사명
  name: string; // 담당자명
  phone: string; // 담당자 연락처
  apiKey: string; // API KEY
  isDevelop: boolean; // 개발/운영 - 개발 or 운영
  createdAt: string; // 매체사명
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    idx: "idx1",
    affiliateName: "매체사명",
    name: "담당자명",
    phone: "담당자 연락처",
    apiKey: "API KEY",
    isDevelop: true,
    createdAt: "2024-10-28 09:00:00",
  },
];
const PAGE_RANGE = 5;

export default function AffiliateListModal({
  idx,
  name,
}: {
  idx: string;
  name: string;
}) {
  const [data, setData] = useState(DEFAULT_DATA);
  const [page, setPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const { createQueryString } = useCustomParams();

  useEffect(() => {}, [startPage]);

  // 테이블 정렬
  const handleSort = (type: string) => {
    //console.log(type);
  };

  const COLUMNS = [
    columnHelper.accessor("idx", {
      id: "idx",
      header: () => <TableTh text="IDX" onSort={() => handleSort("idx")} />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("affiliateName", {
      id: "affiliateName",
      header: () => (
        <TableTh text="매체사명" onSort={() => handleSort("affiliateName")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <TableTh text="매체사 담당자" onSort={() => handleSort("name")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => (
        <TableTh text="담당자 연락처" onSort={() => handleSort("phone")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("apiKey", {
      id: "apiKey",
      header: () => <TableTh text="API KEY" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isDevelop", {
      id: "isDevelop",
      header: () => (
        <TableTh text="개발/운영" onSort={() => handleSort("isDevelop")} />
      ),
      cell: (info) => (info.getValue() ? "개발" : "운영"),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <TableTh text="등록일시" onSort={() => handleSort("createdAt")} />
      ),
      cell: (info) => {
        const newDate = info.getValue().split(" ");

        return (
          <div>
            <div>{newDate[0]}</div>
            <div>{newDate[1]}</div>
          </div>
        );
      },
    }),
  ];

  return (
    <div className="min-w-[80vw] w-full h-full flex flex-col gap-5">
      <div className="text-xl font-bold">
        {name}({idx})의 매체사 목록
      </div>
      <Table tableClass="[&_td]:py-3" tableData={{ data, columns: COLUMNS }} />
      <Pages
        activePage={Number(page) === 0 ? 1 : Number(page)}
        className="pt-4"
        createQueryString={createQueryString}
        pageRange={PAGE_RANGE}
        startPage={startPage}
        totalPages={12}
      />
    </div>
  );
}
