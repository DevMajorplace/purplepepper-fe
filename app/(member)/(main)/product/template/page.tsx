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
import { PiPlusBold } from "react-icons/pi";
import { RiRefreshLine } from "react-icons/ri";
import Link from "next/link";

import TableTh from "../../_components/TableTh";
import Table from "../../_components/Table";

import Card from "@/components/card";
import Pages from "@/components/Pages";
import CalendarInput, { dateFormat } from "@/components/Input/CalendarInput";
import useCustomParams from "@/hooks/useCustomParams";
import { usePathname } from "next/navigation";

type RowObj = {
  idx: string; // IDX
  name: string; // 템플릿명
  typeIdx: string; // 연결 소분류 IDX
  typeName: string; // 연결 소분류명
  landingCount: number; // 랜딩 카운트
  participationCount: number; // 참여 카운트
  link: string; // 접속 링크
  manage: ReactElement; // 수정하기
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    idx: "idx1", // IDX
    name: "템플릿명", // 템플릿명
    typeIdx: "연결 소분류 IDX", // 연결 소분류 IDX
    typeName: "연결 소분류명", // 연결 소분류명
    landingCount: 100, // 랜딩 카운트
    participationCount: 100, // 참여 카운트
    link: "접속링크", // 접속 링크
  },
  {
    idx: "idx2", // IDX
    name: "템플릿명", // 템플릿명
    typeIdx: "연결 소분류 IDX", // 연결 소분류 IDX
    typeName: "연결 소분류명", // 연결 소분류명
    landingCount: 100, // 랜딩 카운트
    participationCount: 100, // 참여 카운트
    link: "접속링크", // 접속 링크
  },
];
const DEFAULT_FILTER = {
  type: "idx",
  keyword: "",
  show: false,
};
const PAGE_RANGE = 5;

export default function ProductTemplate() {
  const [data, setData] = useState(DEFAULT_DATA);
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
  const pathname = usePathname();

  useEffect(() => {
    const crrpage = getCustomParams("page");
    const type = getCustomParams("type");
    const keyword = getCustomParams("keyword");

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
        <TableTh text="템플릿명" onSort={() => handleSort("name")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("typeIdx", {
      id: "typeIdx",
      header: () => (
        <TableTh text="연결 소분류 IDX" onSort={() => handleSort("typeIdx")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("typeName", {
      id: "typeName",
      header: () => (
        <TableTh text="연결 소분류명" onSort={() => handleSort("typeName")} />
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
    columnHelper.accessor("link", {
      id: "link",
      header: () => (
        <TableTh text="접속 링크" onSort={() => handleSort("link")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("manage", {
      id: "manage",
      header: () => <TableTh className="text-center" text="상세 보기" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <Link href={pathname}>
            <button className="border border-[#ccc] rounded-md px-4 py-2">
              수정하기
            </button>
          </Link>
        </div>
      ),
    }),
  ];

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

    // 1페이지로 이동 후 params 초기화
    setCustomParams("page", "1", ["type", "keyword"]);
  };

  return (
    <Card className="min-h-[87vh]">
      <div className="w-full h-full scroll-bar flex flex-col gap-5">
        <div className="flex justify-between items-end">
          <div className="text-lg font-bold">
            템플릿 수 : {total.toLocaleString()}개
            <p className="text-sm text-[#888]">
              미션 참여 버튼 클릭시 노출 될 소분류별 템플릿의 목록입니다.
            </p>
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
                  className={`items-center gap-2 flex`}
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <select
                    className="h-8"
                    value={search.type}
                    onChange={(e) => handleSelect(e)}
                  >
                    <option value="idx">IDX</option>
                    <option value="name">템플릿명</option>
                    <option value="typeIdx">연결 소분류 IDX</option>
                    <option value="typeName">연결 소분류명</option>
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
            <Link href={`${pathname}/add`}>
              <div className="border border-[#ccc] rounded-md px-4 flex items-center gap-1 cursor-pointer h-12">
                <PiPlusBold className="text-[18px] pt-[1px]" /> 새 템플릿 추가
              </div>
            </Link>
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
