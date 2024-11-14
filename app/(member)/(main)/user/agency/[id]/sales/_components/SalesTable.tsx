import { createColumnHelper } from "@tanstack/react-table";

import TableTh from "@/app/(member)/(main)/_components/TableTh";
import Table from "@/app/(member)/(main)/_components/Table";

type RowObj = {
  target: number; // 이번 달 목표 매출
  sales: number; // 이번 달 현재 매출
  achievementRate: number; // 목표 매출 달성율
};

const columnHelper = createColumnHelper<RowObj>();

export default function SalesTable({ data, className }: SalesTableProps) {
  const COLUMNS = [
    columnHelper.accessor("target", {
      id: "target",
      header: () => <TableTh text="이번 달 목표 매출" />,
      cell: (info) => `${info.getValue().toLocaleString()} 원`,
    }),
    columnHelper.accessor("sales", {
      id: "sales",
      header: () => <TableTh text="이번 달 현재 매출" />,
      cell: (info) => `${info.getValue().toLocaleString()} 원`,
    }),
    columnHelper.accessor("achievementRate", {
      id: "achievementRate",
      header: () => <TableTh text="목표 매출 달성율" />,
      cell: (info) =>
        `${(info.row.original.sales / info.row.original.target) * 100} %`,
    }),
  ];

  return (
    <Table
      tableClass={`[&_td]:py-3 ${className}`}
      tableData={{ data, columns: COLUMNS }}
    />
  );
}
