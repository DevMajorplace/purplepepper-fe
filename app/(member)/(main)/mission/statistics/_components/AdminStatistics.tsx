import { createColumnHelper } from "@tanstack/react-table";

import TableTh from "../../../_components/TableTh";
import Table from "../../../_components/Table";

type RowObj = {
  chk: string; // 체크 박스
  idx: string; // 체크 박스
  recommnedIdx: string; // 직상위 사용자 IDX
  recommnedName: string; // 직상위 사용자명
  affiliateIdx: string; // 매체사 IDX
  affiliateName: string; // 매체사명
  missionIdx: string; // 미션 IDX
  missionName: string; // 미션명
  clientIdx: string; // 광고주 IDX
  clientName: string; // 광고주명
  landingCount: number; // 랜딩 카운트
  participationCount: number; // 참여 카운트
  participationDate: string; // 참여일시
};

const columnHelper = createColumnHelper<RowObj>();

export default function AdminStatistics({
  data,
  chk,
  handleAllChkChange,
  handleChkChange,
  handleSort,
}: AdminStatisticsProps) {
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
    columnHelper.accessor("recommnedIdx", {
      id: "recommnedIdx",
      header: () => (
        <TableTh
          text="직상위 사용자 IDX"
          onSort={() => handleSort("recommnedIdx")}
        />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("recommnedName", {
      id: "recommnedName",
      header: () => (
        <TableTh
          text="직상위 사용자명"
          onSort={() => handleSort("recommnedName")}
        />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("affiliateIdx", {
      id: "affiliateIdx",
      header: () => (
        <TableTh text="매체사 IDX" onSort={() => handleSort("affiliateIdx")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("affiliateName", {
      id: "affiliateName",
      header: () => (
        <TableTh text="매체사명" onSort={() => handleSort("affiliateName")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("missionIdx", {
      id: "missionIdx",
      header: () => (
        <TableTh text="미션 IDX" onSort={() => handleSort("missionIdx")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("missionName", {
      id: "missionName",
      header: () => (
        <TableTh text="미션명" onSort={() => handleSort("missionName")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("clientIdx", {
      id: "clientIdx",
      header: () => (
        <TableTh text="광고주 IDX" onSort={() => handleSort("clientIdx")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("clientName", {
      id: "clientName",
      header: () => (
        <TableTh text="광고주명" onSort={() => handleSort("clientName")} />
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
