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
import Card from "@/components/card";

type RowObj = {
  chk: ReactElement; // 체크 박스
  idx: string; // CS IDX
  missionIdx: string; // 미션 IDX
  missionName: string; // 미션명
  missionType: {
    // 미션 분류
    major: string; // 대분류
    middle: string; // 중분류
    small: string; // 소분류
  };
  productIdx: string; // 상품 IDX
  productName: string; // 상품명
  csType: string; // CS 유형
  csCount: number; // 동일미션 CS 카운트
  createdAt: string; // 등록 일시
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    idx: "CS idx1",
    missionIdx: "미션 idx1",
    missionName: "미션명1",
    missionType: {
      major: "대분류",
      middle: "중분류",
      small: "소분류",
    },
    productIdx: "상품 idx1",
    productName: "상품명1",
    csType: "CS 유형",
    csCount: 100,
    createdAt: "2024-10-10 09:00:00",
  },
  {
    idx: "CS idx2",
    missionIdx: "미션 idx2",
    missionName: "미션명2",
    missionType: {
      major: "대분류",
      middle: "중분류",
      small: "소분류",
    },
    productIdx: "상품 idx2",
    productName: "상품명2",
    csType: "CS 유형",
    csCount: 100,
    createdAt: "2024-10-10 09:00:00",
  },
];
// 검색 초기값 - 매체사 아이디
const DEFAULT_FILTER = {
  type: "affiliateIdx",
  keyword: "",
  show: false,
};
const DEFAULT_DATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function MissionCSList() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [chk, setChk] = useState<string[]>([]);
  const [totalCS, setTotalCS] = useState(0);
  const [createdAt, setCreatedAt] = useState<{
    start: string | null;
    end: string | null;
  }>(DEFAULT_DATE);
  const [search, setSearch] = useState<{
    type: string;
    keyword: string;
    show: boolean;
  }>(DEFAULT_FILTER);
  const [page, setPage] = useState(1);
  const [csType, setCstype] = useState("all");
  const [startPage, setStartPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const { getCustomParams, setCustomParams, createQueryString } =
    useCustomParams();

  useEffect(() => {
    const crrpage = getCustomParams("page");
    const cStart = getCustomParams("cStart");
    const cEnd = getCustomParams("cEnd");
    const csType = getCustomParams("csType");
    const type = getCustomParams("type");
    const keyword = getCustomParams("keyword");

    // 등록일시 검색 Params가 있으면
    if (cStart && cEnd) {
      setCreatedAt({
        start: cStart,
        end: cEnd,
      });
    }

    // CS 유형 Params가 있으면
    if (csType) {
      setCstype(csType);
    }

    // 검색 타입, 키워드 Params가 있으면
    if (type && keyword) {
      setSearch({
        type,
        keyword,
        show: true,
      });
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
    getCustomParams("cStart"),
    getCustomParams("cEnd"),
    getCustomParams("csType"),
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
    columnHelper.accessor("csType", {
      id: "csType",
      header: () => <TableTh text="CS 유형" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("csCount", {
      id: "csCount",
      header: () => (
        <TableTh
          text="동일미션 CS카운트"
          onSort={() => handleSort("csCount")}
        />
      ),
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <TableTh text="등록일시" onSort={() => handleSort("createdAt")} />
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

  // CS 타입 수정시
  const handleCsTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setCstype(e.target.value);
    setCustomParams(["csType", "page"], [value, "1"]);
  };

  // 등록일시 검색
  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      const start = dateFormat(value[0], "day", "-");
      const end = dateFormat(value[1], "day", "-");

      setCreatedAt({
        start,
        end,
      });
      setCustomParams(["cStart", "cEnd", "page"], [start, end, "1"]);
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
    // 등록일시 검색 초기화
    setCreatedAt(DEFAULT_DATE);

    // 1페이지로 이동 후 params 초기화
    setCustomParams("page", "1", [
      "type",
      "keyword",
      "cStart",
      "cEnd",
      "major",
      "middle",
      "small",
    ]);
  };

  return (
    <Card className="min-h-[87vh]">
      <div className="w-full h-full flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="text-lg font-bold">
            미션 CS 개수 : {totalCS.toLocaleString()}건
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-3">
              <TableSelect
                label={"CS 유형"}
                name={"state"}
                options={[
                  { value: "all", name: "전체" },
                  { value: "csType1", name: "CS 유형1" },
                  { value: "csType2", name: "CS 유형2" },
                ]}
                value={csType}
                onChange={(e) => handleCsTypeChange(e)}
              />
              {/* 미션 분류 */}
              <MissionTypeSelect />
            </div>
            <div className="flex gap-3">
              <CalendarInput
                endDate={createdAt.end ? createdAt.end : ""}
                placeholder="등록일시 검색"
                range={true}
                required={true}
                startDate={createdAt.start ? createdAt.start : ""}
                width="w-64"
                onChange={(value) => handleDateChange(value)}
              />
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
                      <option value="affiliateIdx">매체사 IDX</option>
                      <option value="affiliateName">매체사명</option>
                      <option value="adid">ADID</option>
                      <option value="clientIdx">광고주 IDX</option>
                      <option value="clientName">광고주명</option>
                      <option value="missionIdx">미션 IDX</option>
                      <option value="missionName">미션명</option>
                      <option value="productIdx">상품 IDX</option>
                      <option value="productName">상품명</option>
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
        <Table
          tableClass="[&_td]:py-3"
          tableData={{ data, columns: COLUMNS }}
        />
        <Pages
          activePage={Number(page) === 0 ? 1 : Number(page)}
          className="pt-4"
          createQueryString={createQueryString}
          pageRange={PAGE_RANGE}
          startPage={startPage}
          totalPages={12}
        />
      </div>
    </Card>
  );
}
