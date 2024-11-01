import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import CardTitle from "./CardTitle";
import Table from "../../_components/Table";
import TableTh from "../../_components/TableTh";

type RowObj = {
  no: number;
  idx: string;
  company: string;
  companyId: string;
  currentAmount: number;
  totalAmount: number;
  SettlementAmount: number;
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT = [
  {
    no: 1,
    idx: "idx-1",
    company: "매체사명1",
    companyId: "매체사ID-1",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
  {
    no: 2,
    idx: "idx-2",
    company: "매체사명2",
    companyId: "매체사ID-2",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
  {
    no: 3,
    idx: "idx-3",
    company: "매체사명3",
    companyId: "매체사ID-3",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
  {
    no: 4,
    idx: "idx-4",
    company: "매체사명4",
    companyId: "매체사ID-4",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
  {
    no: 5,
    idx: "idx-5",
    company: "매체사명5",
    companyId: "매체사ID-5",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
  {
    no: 6,
    idx: "idx-6",
    company: "매체사명6",
    companyId: "매체사ID-6",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
  {
    no: 7,
    idx: "idx-7",
    company: "매체사명7",
    companyId: "매체사ID-7",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
  {
    no: 8,
    idx: "idx-8",
    company: "매체사명8",
    companyId: "매체사ID-8",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
  {
    no: 9,
    idx: "idx-9",
    company: "매체사명9",
    companyId: "매체사ID-9",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
  {
    no: 10,
    idx: "idx-10",
    company: "매체사명10",
    companyId: "매체사ID-10",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
  {
    no: 11,
    idx: "idx-11",
    company: "매체사명11",
    companyId: "매체사ID-11",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
  {
    no: 12,
    idx: "idx-12",
    company: "매체사명12",
    companyId: "매체사ID-12",
    currentAmount: 100000,
    totalAmount: 200000,
    SettlementAmount: 10000,
  },
];

const COLUMNS = [
  columnHelper.accessor("no", {
    id: "no",
    header: () => <TableTh text="NO" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("idx", {
    id: "idx",
    header: () => <TableTh text="IDX" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("company", {
    id: "company",
    header: () => <TableTh text="매체사명" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("companyId", {
    id: "companyId",
    header: () => <TableTh text="매체사 ID" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("currentAmount", {
    id: "currentAmount",
    header: () => <TableTh text="현재 소진수량" />,
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("totalAmount", {
    id: "totalAmount",
    header: () => <TableTh text="최대 소진수량" />,
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("SettlementAmount", {
    id: "SettlementAmount",
    header: () => <TableTh text="정산금액" />,
    cell: (info) => `${info.getValue().toLocaleString()}원`,
  }),
];

export default function BurnoutRateModal() {
  const [burnoutRate, setBurnoutRate] = useState(DEFAULT);

  useEffect(() => {
    if (!burnoutRate) {
      setBurnoutRate(DEFAULT);
    }
  }, [burnoutRate]);

  return (
    <div className="flex flex-col gap-3">
      <CardTitle title="매체사별 소진량" />
      <div className="w-[52vw] max-h-[64vh] overflow-hidden overflow-y-scroll scroll-bar pr-1">
        <Table
          tableClass="relative [&_thead]:sticky [&_thead]:-top-[1px]"
          tableData={{ data: burnoutRate, columns: COLUMNS }}
        />
      </div>
    </div>
  );
}
