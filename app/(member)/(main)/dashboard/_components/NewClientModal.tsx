import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import Table from "../../_components/Table";
import TableTh from "../../_components/TableTh";

import CardTitle from "./CardTitle";

type RowObj = {
  idx: string;
  date: string;
  name: string;
  memberId: string;
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT = [
  {
    idx: "idx-1",
    date: "2024.10.01",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-2",
    date: "2024.10.02",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-3",
    date: "2024.10.03",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-4",
    date: "2024.10.04",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-5",
    date: "2024.10.05",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-6",
    date: "2024.10.06",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-7",
    date: "2024.10.07",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-8",
    date: "2024.10.08",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-9",
    date: "2024.10.09",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-10",
    date: "2024.10.10",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-11",
    date: "2024.10.11",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-12",
    date: "2024.10.12",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-13",
    date: "2024.10.13",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-14",
    date: "2024.10.14",
    name: "광고주1",
    memberId: "회원아이디",
  },
  {
    idx: "idx-15",
    date: "2024.10.15",
    name: "광고주1",
    memberId: "회원아이디",
  },
];

const COLUMNS = [
  columnHelper.accessor("idx", {
    id: "idx",
    header: () => <TableTh text="IDX" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("date", {
    id: "date",
    header: () => <TableTh text="가입일자" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: () => <TableTh text="광고주명" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("memberId", {
    id: "memberId",
    header: () => <TableTh text="아이디" />,
    cell: (info) => info.getValue(),
  }),
];

export default function NewClientModal() {
  const [newClient, setNewClient] = useState(DEFAULT);

  useEffect(() => {
    if (!newClient) {
      setNewClient(DEFAULT);
    }
  }, [newClient]);

  return (
    <div className="flex flex-col gap-3">
      <CardTitle title="이번 달 새 광고주" />
      <div className="w-[24vw] max-h-[64vh] overflow-hidden overflow-y-scroll scroll-bar pr-1">
        <Table
          tableClass="relative [&_thead]:sticky [&_thead]:-top-[1px]"
          tableData={{ data: newClient, columns: COLUMNS }}
        />
      </div>
    </div>
  );
}
