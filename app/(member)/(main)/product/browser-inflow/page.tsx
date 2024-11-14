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
import Link from "next/link";

import TableTh from "../../_components/TableTh";
import Table from "../../_components/Table";

import Card from "@/components/card";
import Pages from "@/components/Pages";
import CalendarInput, { dateFormat } from "@/components/Input/CalendarInput";
import useCustomParams from "@/hooks/useCustomParams";

type RowObj = {
  idx: string; // IDX
  name: string; // 브라우저 유입 경로명
  appName: string; // 실행할 앱 이름
  type: string; // 경로 실행 타입
  uriScheme: string; // URI Scheme
  appLink: string; // 앱링크(안드로이드)
  universalLink: string; // 유니버셜링크(아이폰)
  isUse: boolean; // 사용여부
  createdAt: string; // 등록일
  manage: ReactElement; // 수정하기
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    idx: "idx", // IDX
    name: "브라우저 유입 경로명", // 브라우저 유입 경로명
    appName: "실행할 앱 이름", // 실행할 앱 이름
    type: "경로 실행 타입", // 경로 실행 타입
    uriScheme: "URI Scheme", // URI Scheme
    appLink: "앱링크", // 앱링크(안드로이드)
    universalLink: "유니버셜링크", // 유니버셜링크(아이폰)
    isUse: true, // 사용여부
    createdAt: "2024-10-21", // 등록일
  },
];
const DEFAULT_FILTER = {
  type: "idx",
  keyword: "",
  show: false,
};
const DEFAULT_DATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function ProductBrowserInflow() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [createdAt, setCreatedAt] = useState<{
    start: string | null;
    end: string | null;
  }>(DEFAULT_DATE);
  const [search, setSearch] = useState<{
    type: string;
    keyword: string;
    show: boolean;
  }>(DEFAULT_FILTER);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const { getCustomParams, setCustomParams, createQueryString } =
    useCustomParams();

  useEffect(() => {
    const crrpage = getCustomParams("page");
    const cStart = getCustomParams("cStart");
    const cEnd = getCustomParams("cEnd");
    const type = getCustomParams("type");
    const keyword = getCustomParams("keyword");

    // 등록일 Params가 있으면
    if (cStart && cEnd) {
      setCreatedAt({
        start: cStart,
        end: cEnd,
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
    getCustomParams("type"),
    getCustomParams("keyword"),
    startPage,
  ]);

  // 테이블 정렬
  const handleSort = (type: string) => {
    //console.log(type);
  };

  const COLUMNS = [
    columnHelper.accessor("idx", {
      id: "idx",
      header: () => <TableTh text="IDX" onSort={() => handleSort("idx")} />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <TableTh
          text="브라우저 유입 경로명"
          onSort={() => handleSort("name")}
        />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("appName", {
      id: "appName",
      header: () => (
        <TableTh text="실행할 앱 이름" onSort={() => handleSort("appName")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("type", {
      id: "type",
      header: () => (
        <TableTh text="경로 실행 타입" onSort={() => handleSort("type")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("appLink", {
      id: "appLink",
      header: () => (
        <TableTh
          text="앱링크(안드로이드)"
          onSort={() => handleSort("appLink")}
        />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("universalLink", {
      id: "universalLink",
      header: () => (
        <TableTh
          text="유니버셜링크(아이폰)"
          onSort={() => handleSort("universalLink")}
        />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <TableTh text="등록일" onSort={() => handleSort("createdAt")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isUse", {
      id: "isUse",
      header: () => (
        <TableTh text="사용여부" onSort={() => handleSort("isUse")} />
      ),
      cell: (info) => (info.getValue() ? "사용" : "사용안함"),
    }),
    columnHelper.accessor("manage", {
      id: "manage",
      header: () => <TableTh className="text-center" text="상세 보기" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <Link href={`/product/browser-inflow/${info.row.original.idx}`}>
            <button className="border border-[#ccc] rounded-md px-4 py-2">
              수정하기
            </button>
          </Link>
        </div>
      ),
    }),
  ];

  // 등록일로 검색
  const handleCreatedAtChange = (value: Value) => {
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
    // 발생시점 검색 초기화
    setCreatedAt(DEFAULT_DATE);

    // 1페이지로 이동 후 params 초기화
    setCustomParams("page", "1", ["type", "keyword", "cStart", "cEnd"]);
  };

  return (
    <Card className="min-h-[87vh]">
      <div className="w-full h-full scroll-bar flex flex-col gap-5">
        <div className="flex justify-between items-end">
          <div className="text-lg font-bold">
            브라우저 유입 경로 수 : {total.toLocaleString()}개
            <p className="text-sm text-[#888]">
              미션 랜딩 페이지에서 특정 버튼을 누르면 실행되는
              브라우저(앱)입니다.
            </p>
          </div>
          <div className="flex gap-3">
            <CalendarInput
              endDate={createdAt.end ? createdAt.end : ""}
              placeholder="등록일 검색"
              range={true}
              required={true}
              startDate={createdAt.start ? createdAt.start : ""}
              width="w-64"
              onChange={(value) => handleCreatedAtChange(value)}
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
                  className={`items-center gap-2 flex`}
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <select
                    className="h-8"
                    value={search.type}
                    onChange={(e) => handleSelect(e)}
                  >
                    <option value="idx">IDX</option>
                    <option value="name">브라우저 유입 경로명</option>
                    <option value="appName">실행할 앱 이름</option>
                    <option value="type">경로 실행 타입</option>
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
        <Table
          tableClass={"[&_td]:py-3"}
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
