"use client";

import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { PiDownloadSimple } from "react-icons/pi";
import { RiRefreshLine } from "react-icons/ri";

import Pages from "@/components/Pages";
import CalendarInput, { dateFormat } from "@/components/Input/CalendarInput";
import TableSelect from "@/components/Select/TableSelect";
import useCustomParams from "@/hooks/useCustomParams";
import TableTh from "@/app/(member)/(main)/_components/TableTh";
import Table from "@/app/(member)/(main)/_components/Table";
import MissionTypeSelect from "@/components/Select/MissionTypeSelect";

type RowObj = {
  chk: ReactElement; // 체크 박스
  idx: string; // 미션 IDX
  state: string; // 미션 상태
  name: string; // 미션명
  productIdx: string; // 상품 IDX
  productName: string; // 상품명
  missionType: {
    // 미션 분류
    major: string; // 대분류
    middle: string; // 중분류
    small: string; // 소분류
  };
  clientIdx: string; // 광고주 IDX
  clientName: string; // 광고주명
  participation: {
    // 일 참여현황
    value: number; // 현황
    total: number; // 목표
  };
  totalParticipation: {
    // 총 참여현황
    value: number; // 현황
    total: number; // 목표
  };
  startDate: string; // 시작일시
  endDate: string; // 종료일시
  duplicate: boolean; // 중복 참여
  exhaustionHistory: ReactElement; // 소진내역
  salesHistory: ReactElement; // 매출내역
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    idx: "미션 idx1",
    state: "진행중",
    name: "미션명",
    productIdx: "상품 idx1",
    productName: "상품명",
    missionType: {
      major: "대분류",
      middle: "중분류",
      small: "소분류",
    },
    clientIdx: "광고주 idx",
    clientName: "광고주명",
    participation: {
      value: 200,
      total: 1000,
    },
    totalParticipation: {
      value: 9000,
      total: 10000,
    },
    startDate: "2024-10-10 09:00:00",
    endDate: "2024-10-10 09:00:00",
    duplicate: false,
    exhaustionHistory: (
      <button className="border border-[#ccc] rounded-md px-4 py-2">
        소진 내역
      </button>
    ),
    salesHistory: (
      <button className="border border-[#ccc] rounded-md px-4 py-2">
        매출 내역
      </button>
    ),
  },
  {
    idx: "미션 idx2",
    state: "일시정지",
    name: "미션명",
    productIdx: "상품 idx1",
    productName: "상품명",
    missionType: {
      major: "대분류",
      middle: "중분류",
      small: "소분류",
    },
    clientIdx: "광고주 idx",
    clientName: "광고주명",
    participation: {
      value: 200,
      total: 1000,
    },
    totalParticipation: {
      value: 9000,
      total: 10000,
    },
    startDate: "2024-10-10 09:00:00",
    endDate: "2024-10-10 09:00:00",
    duplicate: false,
    exhaustionHistory: (
      <button className="border border-[#ccc] rounded-md px-4 py-2">
        소진 내역
      </button>
    ),
    salesHistory: (
      <button className="border border-[#ccc] rounded-md px-4 py-2">
        매출 내역
      </button>
    ),
  },
  {
    idx: "미션 idx3",
    state: "종료",
    name: "미션명",
    productIdx: "상품 idx1",
    productName: "상품명",
    missionType: {
      major: "대분류",
      middle: "중분류",
      small: "소분류",
    },
    clientIdx: "광고주 idx",
    clientName: "광고주명",
    participation: {
      value: 200,
      total: 1000,
    },
    totalParticipation: {
      value: 9000,
      total: 10000,
    },
    startDate: "2024-10-10 09:00:00",
    endDate: "2024-10-10 09:00:00",
    duplicate: true,
    exhaustionHistory: (
      <button className="border border-[#ccc] rounded-md px-4 py-2">
        소진 내역
      </button>
    ),
    salesHistory: (
      <button className="border border-[#ccc] rounded-md px-4 py-2">
        매출 내역
      </button>
    ),
  },
];
const DEFAULT_FILTER = {
  type: "idx",
  keyword: "",
  show: false,
};
const DEFAULT_DATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function MissionList() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [chk, setChk] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<{
    start: string | null;
    end: string | null;
  }>(DEFAULT_DATE);
  const [endDate, setEndDate] = useState<{
    start: string | null;
    end: string | null;
  }>(DEFAULT_DATE);
  const [search, setSearch] = useState<{
    type: string;
    keyword: string;
    show: boolean;
  }>(DEFAULT_FILTER);
  const [page, setPage] = useState(1);
  const [totalMission, setTotalMission] = useState(0);
  const [state, setState] = useState("all");
  const [duplicate, setDuplicate] = useState("all");
  const [startPage, setStartPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const { getCustomParams, setCustomParams, createQueryString } =
    useCustomParams();

  useEffect(() => {
    const crrpage = getCustomParams("page");
    const sStart = getCustomParams("sStart");
    const sEnd = getCustomParams("sEnd");
    const eStart = getCustomParams("eStart");
    const eEnd = getCustomParams("eEnd");
    const state = getCustomParams("state");
    const duplicate = getCustomParams("duplicate");
    const type = getCustomParams("type");
    const keyword = getCustomParams("keyword");

    // 시작일 검색 Params가 있으면
    if (sStart && sEnd) {
      setStartDate({
        start: sStart,
        end: sEnd,
      });
    }

    // 종료일 검색 Params가 있으면
    if (eStart && eEnd) {
      setEndDate({
        start: eStart,
        end: eEnd,
      });
    }

    // 검색 타입, 키워드 Params가 있으면
    if (type && keyword) {
      setSearch({
        type,
        keyword,
        show: true,
      });
    }

    // 처리 상태 Params가 있으면
    if (state) {
      setState(state);
    }

    // 중복 참여 Params가 있으면
    if (duplicate) {
      setDuplicate(duplicate);
    }

    // 페이지 Params가 있으면
    if (crrpage) {
      setPage(Number(crrpage));

      if (Number(crrpage) >= startPage + PAGE_RANGE) {
        setStartPage((prev) => prev + PAGE_RANGE);
      }
      if (Number(crrpage) < startPage) {
        setStartPage((prev) => prev - PAGE_RANGE);
      }
    }
  }, [
    getCustomParams("page"),
    getCustomParams("sStart"),
    getCustomParams("sEnd"),
    getCustomParams("eStart"),
    getCustomParams("eEnd"),
    getCustomParams("state"),
    getCustomParams("duplicate"),
    getCustomParams("type"),
    getCustomParams("keyword"),
    startPage,
  ]);

  // 테이블 정렬
  const handleSort = (type: string) => {
    //console.log(type);
  };

  // 전체 체크 박스 클릭
  const handleAllChkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (checked) {
      setChk(data.map((item) => item.idx));
    } else {
      setChk([]);
    }
  };

  // 개별 체크 박스 클릭
  const handleChkChange = (
    e: ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line prettier/prettier
    target: string
  ) => {
    const checked = e.target.checked;

    if (checked) {
      setChk([...chk, target]);
    } else {
      setChk(chk.filter((item) => item !== target));
    }
  };

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
    columnHelper.accessor("idx", {
      id: "idx",
      header: () => <TableTh text="IDX" onSort={() => handleSort("idx")} />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("state", {
      id: "state",
      header: () => <TableTh text="미션상태" />,
      cell: (info) => (
        <span
          className={`${info.getValue() === "진행중" ? "bg-[#F0FDF4] text-[#16A34A]" : info.getValue() === "일시정지" ? "bg-[#FEF2F2] text-[#DC2626]" : "bg-[#71717A] text-[#fff]"} inline-flex py-1 px-4 rounded-full`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => <TableTh text="미션명" onSort={() => handleSort("name")} />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("productIdx", {
      id: "productIdx",
      header: () => (
        <TableTh text="상품 IDX" onSort={() => handleSort("productIdx")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("productName", {
      id: "productName",
      header: () => (
        <TableTh text="상품명" onSort={() => handleSort("productName")} />
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
    columnHelper.accessor("participation", {
      id: "participation",
      header: () => (
        <TableTh
          text="일 참여현황"
          onSort={() => handleSort("participation")}
        />
      ),
      cell: (info) => {
        const percent = (
          (info.getValue().value / info.getValue().total) *
          100
        ).toFixed(0);

        return (
          <div>
            <div>{percent}%</div>
            <div className="text-[#000]/60">{`${info.getValue().value}/${info.getValue().total}`}</div>
          </div>
        );
      },
    }),
    columnHelper.accessor("totalParticipation", {
      id: "totalParticipation",
      header: () => (
        <TableTh
          text="총 참여현황"
          onSort={() => handleSort("totalParticipation")}
        />
      ),
      cell: (info) => {
        const percent = (
          (info.getValue().value / info.getValue().total) *
          100
        ).toFixed(0);

        return (
          <div>
            <div>{percent}%</div>
            <div className="text-[#000]/60">{`${info.getValue().value}/${info.getValue().total}`}</div>
          </div>
        );
      },
    }),
    columnHelper.accessor("startDate", {
      id: "startDate",
      header: () => (
        <TableTh text="시작일" onSort={() => handleSort("startDate")} />
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
    columnHelper.accessor("endDate", {
      id: "endDate",
      header: () => (
        <TableTh text="종료일" onSort={() => handleSort("endDate")} />
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
    columnHelper.accessor("duplicate", {
      id: "duplicate",
      header: () => <TableTh text="중복 참여" />,
      cell: (info) => (
        <span
          className={`${info.getValue() ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#FEF2F2] text-[#DC2626]"} inline-flex py-1 px-4 rounded-full font-semibold`}
        >
          {info.getValue() ? "가능" : "불가능"}
        </span>
      ),
    }),
    columnHelper.accessor("exhaustionHistory", {
      id: "exhaustionHistory",
      header: () => <TableTh className="text-center" text="소진내역" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("salesHistory", {
      id: "salesHistory",
      header: () => <TableTh className="text-center" text="매출내역" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          {info.getValue()}
        </div>
      ),
    }),
  ];

  // 미션 상태 수정시
  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setState(e.target.value);
    setCustomParams(["state", "page"], [value, "1"]);
  };

  // 중복 참여 수정시
  const handleDuplicateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setDuplicate(e.target.value);
    setCustomParams(["duplicate", "page"], [value, "1"]);
  };

  // 시작일로 검색
  const handleStartDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      const start = dateFormat(value[0], "day", "-");
      const end = dateFormat(value[1], "day", "-");

      setStartDate({
        start,
        end,
      });
      setCustomParams(["sStart", "sEnd", "page"], [start, end, "1"]);
      //console.log(pathname);
    }
  };

  // 종료로 검색
  const handleEndDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      const start = dateFormat(value[0], "day", "-");
      const end = dateFormat(value[1], "day", "-");

      setEndDate({
        start,
        end,
      });
      setCustomParams(["eStart", "eEnd", "page"], [start, end, "1"]);
      //console.log(pathname);
    }
  };

  // 검색 버튼 클릭시
  const handleSearchClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;

    if (
      target.classList.contains("search_button") ||
      target.classList.contains("search_icon")
    ) {
      if (searchRef.current !== null) {
        searchRef.current.focus();
        setSearch({ ...search, show: true });
      }
    }
  };

  // 검색 타입 변경시
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSearch({ ...search, type: value });
  };

  // 검색어 변경시
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearch({ ...search, keyword: value });
  };

  // 검색어 취소시
  const handleCloseSearchClick = () => {
    setSearch({ ...search, keyword: "", show: false });
  };

  // 검색어 제출시
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(search);

    setCustomParams(
      ["type", "keyword", "page"],
      // eslint-disable-next-line prettier/prettier
      [search.type, search.keyword, "1"]
    );
  };

  // 필터 초기화 클릭시
  const handleFilterClick = () => {
    // 검색 초기화
    setSearch(DEFAULT_FILTER);
    // 시작일 검색 초기화
    setStartDate(DEFAULT_DATE);
    // 종료일 검색 초기화
    setEndDate(DEFAULT_DATE);
    // 미션 상태 초기화
    setState("all");
    // 중복 참여 초기화
    setDuplicate("all");

    // 1페이지로 이동 후 params 초기화
    setCustomParams(
      ["page"],
      ["1"],
      [
        "type",
        "keyword",
        "sStart",
        "sEnd",
        "eStart",
        "eEnd",
        "state",
        "duplicate",
        "major",
        "middle",
        "small",
        // eslint-disable-next-line prettier/prettier
      ]
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="text-lg font-bold">
          미션 개수 : {totalMission.toLocaleString()}건
        </div>
        <div className="flex gap-3">
          <CalendarInput
            endDate={startDate.end ? startDate.end : ""}
            placeholder="시작일 검색"
            range={true}
            required={true}
            startDate={startDate.start ? startDate.start : ""}
            width="w-64"
            onChange={(value) => handleStartDateChange(value)}
          />
          <CalendarInput
            endDate={endDate.end ? endDate.end : ""}
            placeholder="종료일 검색"
            range={true}
            required={true}
            startDate={endDate.start ? endDate.start : ""}
            width="w-64"
            onChange={(value) => handleEndDateChange(value)}
          />
        </div>
        <div className="flex justify-between items-end">
          <div className="flex gap-3">
            <TableSelect
              label={"미션 상태"}
              name={"state"}
              options={[
                { value: "all", name: "전체" },
                { value: "pending", name: "진행중" },
                { value: "pause", name: "일시정지" },
                { value: "end", name: "종료" },
              ]}
              value={state}
              onChange={(e) => handleStateChange(e)}
            />
            <TableSelect
              label={"중복 참여"}
              name={"duplicate"}
              options={[
                { value: "all", name: "전체" },
                { value: "true", name: "가능" },
                { value: "false", name: "불가능" },
              ]}
              value={duplicate}
              onChange={(e) => handleDuplicateChange(e)}
            />
            {/* 미션 분류 */}
            <MissionTypeSelect />
          </div>
          <div className="flex gap-3">
            <div
              className={`border border-[#ccc] rounded-md flex items-center cursor-pointer`}
              role="presentation"
              onClick={(e) => handleSearchClick(e)}
            >
              <div
                className={`${search.show ? "px-2" : "w-0"} transiton-all overflow-hidden`}
              >
                <form
                  className={`items-center gap-2 flex search_form`}
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <select
                    className="h-8"
                    value={search.type}
                    onChange={(e) => handleSelect(e)}
                  >
                    <option value="idx">미션 IDX</option>
                    <option value="missionName">미션명</option>
                    <option value="productIdx">상품 IDX</option>
                    <option value="productName">상품명</option>
                    <option value="clientIdx">광고주 IDX</option>
                    <option value="clientName">광고주명</option>
                  </select>
                  <input
                    ref={searchRef}
                    className="h-8 px-2 placeholder:text-[#333]/50"
                    placeholder="검색어를 입력해주세요."
                    type="text"
                    value={search.keyword}
                    onChange={(e) => handleSearchInput(e)}
                  />
                  <div role="presentation" onClick={handleCloseSearchClick}>
                    <IoIosClose className="text-2xl" />
                  </div>
                </form>
              </div>
              <div
                className={`items-center gap-1 ${search.show ? "hidden" : "flex"} search_button px-4 h-full`}
              >
                <IoIosSearch className="text-[18px] pt-[1px] search_icon" />{" "}
                검색
              </div>
            </div>
            <div
              className="border border-[#ccc] rounded-md px-4 flex items-center gap-1 cursor-pointer h-12"
              role="presentation"
              onClick={handleFilterClick}
            >
              <RiRefreshLine className="text-[18px] pt-[1px]" /> 필터 초기화
            </div>
            <div className="border border-[#ccc] rounded-md px-4 flex items-center gap-1 cursor-pointer h-12">
              <PiDownloadSimple className="text-[18px] pt-[1px]" /> 엑셀
              다운로드
            </div>
          </div>
        </div>
      </div>
      <Table tableClass="[&_td]:py-3" tableData={{ data, columns: COLUMNS }} />
      <Pages
        activePage={Number(page) === 0 ? 1 : Number(page)}
        className="pt-4"
        createQueryString={createQueryString}
        pageRange={PAGE_RANGE}
        startPage={startPage}
        totalPages={12}
      />
    </div>
  );
}
