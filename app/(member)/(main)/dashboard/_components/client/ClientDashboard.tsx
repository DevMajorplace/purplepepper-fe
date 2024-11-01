import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { createColumnHelper } from "@tanstack/react-table";

import Table from "../../../_components/Table";
import TableMission from "../TableMission";
import TableParticipate from "../TableParticipate";
import TablePeriod from "../TablePeriod";
import TableTh from "../../../_components/TableTh";

import Card from "@/components/card";

type RowObj = {
  status: JSX.Element;
  mission: JSX.Element;
  type: JSX.Element;
  participate: JSX.Element;
  period: JSX.Element;
  createdAt: string;
  duplication: string;
  point: number;
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    status: <TableMission status="진행중" />,
    mission: <TableMission name="쥬베룩 몬스터의원 예약" status="진행중" />,
    type: <TableMission status="진행중" type="공유미션" />,
    participate: <TableParticipate count={20} status="진행중" total={420} />,
    period: <TablePeriod end="24.10.10 00:00" start="24.10.04 00:00" />,
    createdAt: "24.10.04 11:13",
    duplication: "중복 허용",
    point: 16,
  },
  {
    status: <TableMission status="종료" />,
    mission: <TableMission name="메이저 플레이스" />,
    type: <TableMission type="공유미션" />,
    participate: <TableParticipate count={20} status="종료" total={420} />,
    period: <TablePeriod end="24.10.10 00:00" start="24.10.04 00:00" />,
    createdAt: "24.10.04 11:13",
    duplication: "중복 불가",
    point: 16,
  },
];

const COLUMNS = [
  columnHelper.accessor("status", {
    id: "status",
    header: () => <TableTh text="미션상태" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("mission", {
    id: "mission",
    header: () => <TableTh text="미션명" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    id: "type",
    header: () => <TableTh text="미션타입" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("participate", {
    id: "participate",
    header: () => <TableTh text="참여현황" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("period", {
    id: "period",
    header: () => <TableTh text="미션 기간" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: () => <TableTh text="생성일시" />,
    cell: (info) => <div className="text-[13px]">{info.getValue()}</div>,
  }),
  columnHelper.accessor("duplication", {
    id: "duplication",
    header: () => <TableTh text="중복 참여" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("point", {
    id: "point",
    header: () => <TableTh text="결제 포인트" />,
    cell: (info) => (
      <div className="font-semibold">
        {(info.getValue() / 10000).toFixed(4).toLocaleString()}만P
      </div>
    ),
  }),
];

export default function ClientDashboard() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("total");
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  // 카테고리 클릭시
  const handleCategoryClick = (e: any) => {
    const category = e.target.dataset.category;

    if (category) {
      setCategory(category);
    }
  };

  // 미션 검색 타이핑시
  const handleSearch = (e: any) => {
    const value = e.target.value;

    setSearchText(value);
  };

  // 미션 검색시
  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    const value = e.target.elements.search.value;

    params.set("page", "1");

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // 미션 검색 지우기
  const handleRemoveSearch = () => {
    const searchText = searchParams.get("search");

    setSearchText("");

    if (searchText) {
      params.delete("search");
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <Card>
      {/* <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
      <div
        className="inline-flex p-1 rounded-md bg-[#f1f3f7] *:w-44 *:rounded-md *:py-2 *:text-lg *:text-center *:text-[#9a9a9a] *:transition *:duration-200 hover:*:text-[#888] *:cursor-pointer [&_.selected]:bg-white [&_.selected]:font-semibold [&_.selected]:text-[#333] md-max:*:w-[auto] md-max:*:px-8"
        role="presentation"
        onClick={handleCategoryClick}
      >
        <div
          className={`${category === "total" ? "selected" : ""}`}
          data-category="total"
        >
          전체
        </div>
        <div
          className={`${category === "progress" ? "selected" : ""}`}
          data-category="progress"
        >
          진행중
        </div>
        <div
          className={`${category === "pause" ? "selected" : ""}`}
          data-category="pause"
        >
          정지(신고중/숨김)
        </div>
        <div
          className={`${category === "end" ? "selected" : ""}`}
          data-category="end"
        >
          종료
        </div>
      </div>
      <div>
        <form
          className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:border-gray-700"
          onSubmit={(e) => handleSearchSubmit(e)}
        >
          <input
            className="h-11 w-72 px-4 rounded-s-lg focus:outline-none"
            name="search"
            placeholder="미션 제목을 입력해주세요."
            type="text"
            value={searchText ?? ""}
            onChange={(e) => handleSearch(e)}
          />
          {searchText ? (
            <div
              className="w-11 flex justify-center items-center text-2xl cursor-pointer text-[#aaa]"
              role="presentation"
              onClick={handleRemoveSearch}
            >
              <IoCloseCircleOutline />
            </div>
          ) : (
            <button
              className="w-11 flex justify-center items-center text-2xl"
              type="submit"
            >
              <FiSearch />
            </button>
          )}
        </form>
      </div>
    </div> */}
      <Table tableData={{ data, columns: COLUMNS }} />

      {/* <div className="flex justify-center gap-2">
        <button
          className="border rounded p-1"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.firstPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          disabled={!table.getCanNextPage()}
          onClick={() => table.lastPage()}
        >
          {">>"}
        </button>
      </div> */}
    </Card>
  );
}
