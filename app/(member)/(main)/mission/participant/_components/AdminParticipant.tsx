import { createColumnHelper } from "@tanstack/react-table";
import { ReactElement } from "react";

import TableTh from "../../../_components/TableTh";
import Table from "../../../_components/Table";

type RowObj = {
  chk: ReactElement; // 체크 박스
  idx: string; // 참여자 IDX
  affiliateIdx: string; // 매체사 IDX
  affiliateName: string; // 매체사명
  adid: string; // ADID
  clientIdx: string; // 광고주 IDX
  clientName: string; // 광고주명
  missionIdx: string; // 미션 IDX
  missionName: string; // 미션명
  missionType: {
    // 미션 분류
    major: string; // 대분류
    middle: string; // 중분류
    small: string; // 소분류
  };
  userInputValue: string; // 유저 입력값
  reward: number; // 지급 리워드
  abusing: boolean; // 어뷰징 여부 - true: 정상, false: 어뷰징
  response: boolean; // 응답 확인 - true: 성공, false: 실패
  ip: string; // IP
  participationDate: string; // 참여 일시
};

const columnHelper = createColumnHelper<RowObj>();

export default function AdminParticipant({
  data,
  chk,
  handleAllChkChange,
  handleChkChange,
  handleSort,
}: AdminMissionProps) {
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
    columnHelper.accessor("adid", {
      id: "adid",
      header: () => <TableTh text="ADID" onSort={() => handleSort("adid")} />,
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
    columnHelper.accessor("missionType", {
      id: "missionType",
      header: () => <TableTh text="미션 분류" />,
      cell: (info) => (
        <ul>
          <li>{info.getValue().major}</li>
          <li>{info.getValue().middle}</li>
          <li>{info.getValue().small}</li>
        </ul>
      ),
    }),
    columnHelper.accessor("userInputValue", {
      id: "userInputValue",
      header: () => <TableTh text="유저 입력값" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("reward", {
      id: "reward",
      header: () => (
        <TableTh text="지급 리워드" onSort={() => handleSort("reward")} />
      ),
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("abusing", {
      id: "abusing",
      header: () => (
        <TableTh text="어뷰징 여부" onSort={() => handleSort("abusing")} />
      ),
      cell: (info) => (info.getValue() ? "정상" : "어뷰징"),
    }),
    columnHelper.accessor("response", {
      id: "response",
      header: () => (
        <TableTh text="응답 확인" onSort={() => handleSort("response")} />
      ),
      cell: (info) => (info.getValue() ? "성공" : "실패"),
    }),
    columnHelper.accessor("ip", {
      id: "ip",
      header: () => <TableTh text="IP" />,
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
