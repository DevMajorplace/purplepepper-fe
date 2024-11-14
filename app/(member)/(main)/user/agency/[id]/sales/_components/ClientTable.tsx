import { createColumnHelper } from "@tanstack/react-table";

import TableTh from "@/app/(member)/(main)/_components/TableTh";
import Table from "@/app/(member)/(main)/_components/Table";

type RowObj = {
  total: number; // 총 광고주 수
  depth_1: number; // 1차 광고주 수
  depth_2: number; // 2차 광고주 수
  depth_3: number; // 3차 광고주 수
};

const columnHelper = createColumnHelper<RowObj>();

export default function ClientTable({ data, className }: ClientTableProps) {
  const COLUMNS = [
    columnHelper.accessor("total", {
      id: "total",
      header: () => <TableTh text="총 광고주 수" />,
      cell: (info) =>
        `${(info.row.original.depth_1 + info.row.original.depth_2 + info.row.original.depth_3).toLocaleString()} 명`,
    }),
    columnHelper.accessor("depth_1", {
      id: "depth_1",
      header: () => <TableTh text="1차 광고주 수" />,
      cell: (info) => `${info.getValue().toLocaleString()} 명`,
    }),
    columnHelper.accessor("depth_2", {
      id: "depth_2",
      header: () => <TableTh text="2차 광고주 수" />,
      cell: (info) => `${info.getValue().toLocaleString()} 명`,
    }),
    columnHelper.accessor("depth_3", {
      id: "depth_3",
      header: () => <TableTh text="3차 광고주 수" />,
      cell: (info) => `${info.getValue().toLocaleString()} 명`,
    }),
  ];

  return (
    <Table
      tableClass={`[&_td]:py-3 ${className}`}
      tableData={{ data, columns: COLUMNS }}
    />
  );
}
