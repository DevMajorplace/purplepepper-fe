import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";

import Table from "../../../_components/Table";
import TableTh from "../../../_components/TableTh";
import CardTitle from "../CardTitle";

type RowObj = {
  name: string;
  sales: number;
  profit: number;
  member: number;
  increaseMember: number;
  phone: string;
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    name: "홍길동", // 이름
    sales: 23000000, // 매출
    profit: 3000000, // 순이익
    member: 1000, // 회원수
    increaseMember: 80, // 회원 증가수
    phone: "010-1234-5678", // 연락처
  },
  {
    name: "홍길동2", // 이름
    sales: 42000000, // 매출
    profit: 11000000, // 순이익
    member: 6200, // 회원수
    increaseMember: 125, // 회원 증가수
    phone: "010-1234-5678", // 연락처
  },
];

export default function ClientList() {
  const [data, setData] = useState(DEFAULT_DATA);

  const handleSort = (type: string) => {
    //console.log(type);
  };

  const COLUMNS = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => <TableTh text="이름" onSort={() => handleSort("name")} />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("sales", {
      id: "sales",
      header: () => <TableTh text="매출" onSort={() => handleSort("sales")} />,
      cell: (info) => `${info.getValue().toLocaleString()}원`,
    }),
    columnHelper.accessor("profit", {
      id: "profit",
      header: () => (
        <TableTh text="순이익" onSort={() => handleSort("profit")} />
      ),
      cell: (info) => `${info.getValue().toLocaleString()}원`,
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => <TableTh text="연락처" />,
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <div className="flex flex-col gap-3">
      <CardTitle title="광고주 목록" />
      <Table tableData={{ data, columns: COLUMNS }} />
    </div>
  );
}
