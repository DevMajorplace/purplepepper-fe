"use client";

import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  ReactElement,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { PiDownloadSimple, PiPlusBold } from "react-icons/pi";
import { RiRefreshLine } from "react-icons/ri";
import Link from "next/link";

import TableTh from "../../_components/TableTh";
import Table from "../../_components/Table";

import Card from "@/components/card";
import Pages from "@/components/Pages";
import CalendarInput, { dateFormat } from "@/components/Input/CalendarInput";
import useCustomParams from "@/hooks/useCustomParams";

type RowObj = {
  chk: ReactElement; // 체크 박스
  id: string; // 아이디
  company: string; // 총판명
  sales: number; // 매출
  clients: number; // 회원수
  newClients: number; // 전일 대비 회원 증가수
  point: number; // 보유 포인트
  name: string; // 담당자명
  phone: string; // 담당자 연락처
  createdAt: string; // 등록일시
  manage: ReactElement; // 상세보기
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    id: "회원아이디", // 회원아이디
    company: "총판명2", // 총판명
    sales: 100000, // 매출
    clients: 200, // 광고주 수
    newClients: 12, // 전일 대비 회원 증가수
    point: 10000, // 보유 포인트
    name: "홍길동", // 담당자명
    phone: "010-1234-5678", // 담당자 연락처
    createdAt: "2024-10-21", // 등록일
    manage: (
      <Link href={`/user/agency/${2}`}>
        <button className="border border-[#ccc] rounded-md px-4 py-2">
          상세페이지 이동
        </button>
      </Link>
    ), // 관리 버튼
  },
  {
    id: "회원아이디2", // 회원아이디
    company: "총판명1", // 총판명
    sales: 100000, // 매출
    clients: 200, // 광고주 수
    newClients: 12, // 전일 대비 회원 증가수
    point: 11000, // 보유 포인트
    name: "홍길동", // 담당자명
    phone: "010-1234-5678", // 담당자 연락처
    createdAt: "2024-10-21", // 등록일
    manage: (
      <Link href={`/user/agency/${1}`}>
        <button className="border border-[#ccc] rounded-md px-4 py-2">
          상세페이지 이동
        </button>
      </Link>
    ), // 관리 버튼
  },
];
const DEFAULT_FILTER = {
  type: "id",
  keyword: "",
  show: false,
};
const DEFAULT_DATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function AgencyListPage() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [chk, setChk] = useState<string[]>([]);
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

  // 전체 체크 박스 클릭
  const handleAllChkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (checked) {
      setChk(data.map((item) => item.id));
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
          checked={chk.length === data.length}
          name="allChk"
          type="checkbox"
          onChange={(e) => handleAllChkChange(e)}
        />
      ),
      cell: (info) => {
        const id = info.row.original.id;

        return (
          <input
            checked={chk.includes(id)}
            name="chk"
            type="checkbox"
            onChange={(e) => handleChkChange(e, id)}
          />
        );
      },
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => <TableTh text="아이디" onSort={() => handleSort("id")} />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("company", {
      id: "company",
      header: () => (
        <TableTh text="총판명" onSort={() => handleSort("company")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("sales", {
      id: "sales",
      header: () => (
        <TableTh text="매출" onSort={() => handleSort("company")} />
      ),
      cell: (info) => `${info.getValue().toLocaleString()}원`,
    }),
    columnHelper.accessor("clients", {
      id: "clients",
      header: () => (
        <TableTh text="회원수" onSort={() => handleSort("clients")} />
      ),
      cell: (info) => `${info.getValue().toLocaleString()}명`,
    }),
    columnHelper.accessor("newClients", {
      id: "newClients",
      header: () => (
        <TableTh
          text="전일 대비 회원 증가수"
          onSort={() => handleSort("newClients")}
        />
      ),
      cell: (info) => `${info.getValue().toLocaleString()}명`,
    }),
    columnHelper.accessor("point", {
      id: "point",
      header: () => (
        <TableTh text="보유 포인트" onSort={() => handleSort("point")} />
      ),
      cell: (info) => `${info.getValue().toLocaleString()}원`,
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <TableTh text="담당자명" onSort={() => handleSort("name")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => <TableTh text="담당자 연락처" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <TableTh text="등록일" onSort={() => handleSort("createdAt")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("manage", {
      id: "manage",
      header: () => <TableTh className="text-center" text="상세 보기" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          {info.getValue()}
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
    <Suspense>
      <Card className="min-h-[87vh]">
        <div className="w-full h-full flex flex-col gap-5">
          <div className="flex justify-between items-end">
            <div className="text-lg font-bold">
              총판 등록 수 : {(3000).toLocaleString()}명
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
                      <option value="id">아이디</option>
                      <option value="name">대표자명</option>
                      <option value="phone">대표자 연락처</option>
                      <option value="managerName">담당자명</option>
                      <option value="managerPhone">담당자 연락처</option>
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
              <Link href={"/user/agency/add"}>
                <div className="bg-[#111] text-white rounded-md px-4 flex items-center gap-1 cursor-pointer h-12">
                  <PiPlusBold className="text-[18px] pt-[1px]" /> 총판 추가하기
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
    </Suspense>
  );
}
