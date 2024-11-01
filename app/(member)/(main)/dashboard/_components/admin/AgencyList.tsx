import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";

import Table from "../../../_components/Table";
import TableTh from "../../../_components/TableTh";
import CardTitle from "../CardTitle";

type RowObj = {
  name: string;
  sales: number;
  profit: number;
  clients: number;
  newClients: number;
  phone: string;
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    name: "홍길동", // 광고주명
    sales: 1000000, // 광고비
    profit: 800000, // 순이익
    clients: 5000, // 광고주수
    newClients: 5000, // 전일 대비 회원 증가수
    phone: "010-1234-5678", // 연락처
  },
  {
    name: "홍길동2", // 광고주명
    sales: 1000000, // 광고비
    profit: 800000, // 순이익
    clients: 2000, // 광고주수
    newClients: 2000, // 전일 대비 회원 증가수
    phone: "010-1234-5678", // 연락처
  },
];

export default function AgencyList() {
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
    columnHelper.accessor("clients", {
      id: "clients",
      header: () => (
        <TableTh text="광고주수" onSort={() => handleSort("clients")} />
      ),
      cell: (info) => `${info.getValue().toLocaleString()}명`,
    }),
    columnHelper.accessor("newClients", {
      id: "newClients",
      header: () => <TableTh text="전일 대비 회원 증가수" />,
      cell: (info) => `${info.getValue().toLocaleString()}명`,
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => <TableTh text="연락처" />,
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <div className="flex flex-col gap-3">
      <CardTitle title="총판 목록" />
      <Table tableData={{ data, columns: COLUMNS }} />
    </div>
  );
}
