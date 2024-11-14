import { createColumnHelper } from "@tanstack/react-table";

import TableTh from "../../../_components/TableTh";
import Table from "../../../_components/Table";

type RowObj = {
  chk: string; // 체크 박스
  idx: string; // 체크 박스
  missionName: string; // 미션명
  landingCount: number; // 랜딩 카운트
  participationCount: number; // 참여 카운트
  participationDate: string; // 참여일시
};

const columnHelper = createColumnHelper<RowObj>();

export default function ClientStatistics({
  data,
  chk,
  handleAllChkChange,
  handleChkChange,
  handleSort,
}: ClientStatisticsProps) {
  const COLUMNS = [
    columnHelper.accessor("chk", {
      id: "chk",
      header: () => (
        <input
          checked={data.length !== 0 && chk.length === data.length}
          name="allChk"
          type="checkbox"
          onChange={(e) => handleAllChkChange(e)}
        />
      ),
      cell: (info) => {
        const idx = info.row.original.idx;

        return (
          <input
            checked={chk.includes(idx)}
            name="chk"
            type="checkbox"
            onChange={(e) => handleChkChange(e, idx)}
          />
        );
      },
    }),
    columnHelper.accessor("missionName", {
      id: "missionName",
      header: () => (
        <TableTh text="미션명" onSort={() => handleSort("missionName")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("landingCount", {
      id: "landingCount",
      header: () => (
        <TableTh text="랜딩 카운트" onSort={() => handleSort("landingCount")} />
      ),
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("participationCount", {
      id: "participationCount",
      header: () => (
        <TableTh
          text="참여 카운트"
          onSort={() => handleSort("participationCount")}
        />
      ),
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("participationDate", {
      id: "participationDate",
      header: () => (
        <TableTh
          text="참여일시"
          onSort={() => handleSort("participationDate")}
        />
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
    <Table tableClass="[&_td]:py-3" tableData={{ data, columns: COLUMNS }} />
  );
}
