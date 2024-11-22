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
  chk: ReactElement;
  id: string; // 회원아이디
  company: string; // 업체명
  cash: number; // 보유 캐시
  point: number; // 보유 포인트
  name: string; // 담당자명
  phone: string; // 담당자 연락처
  createdAt: string; // 등록일
  lastLogin: string; // 마지막 로그인
  manage: ReactElement; // 상세보기
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    id: "회원아이디1", // 회원아이디
    company: "업체명", // 업체명
    cash: 100000, // 보유 캐시
    point: 200, // 보유 포인트
    name: "홍길동", // 담당자명
    phone: "010-1234-5678", // 담당자 연락처
    createdAt: "2024-10-21", // 등록일
    lastLogin: "2024-10-21", // 마지막 로그인
  },
  {
    id: "회원아이디2", // 회원아이디
    company: "업체명", // 업체명
    cash: 100000, // 보유 캐시
    point: 200, // 보유 포인트
    name: "홍길동", // 담당자명
    phone: "010-1234-5678", // 담당자 연락처
    createdAt: "2024-10-21", // 등록일
    lastLogin: "2024-10-21", // 마지막 로그인
  },
];
const DEFAULT_FILTER = {
  type: "id",
  keyword: "",
  show: false,
};
const DEFAULT_DATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function ClientListPage() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [chk, setChk] = useState<string[]>([]);
  const [createdAt, setCreatedAt] = useState<{
    start: string | null;
    end: string | null;
  }>(DEFAULT_DATE);
  const [lastLogin, setLastLogin] = useState<{
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
    const lStart = getCustomParams("lStart");
    const lEnd = getCustomParams("lEnd");
    const type = getCustomParams("type");
    const keyword = getCustomParams("keyword");

    // 등록일 Params가 있으면
    if (cStart && cEnd) {
      setCreatedAt({
        start: cStart,
        end: cEnd,
      });
    }

    // 마지막 로그인 Params가 있으면
    if (lStart && lEnd) {
      setLastLogin({
        start: lStart,
        end: lEnd,
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
    getCustomParams("lStart"),
    getCustomParams("lEnd"),
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
        <TableTh text="업체명" onSort={() => handleSort("company")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("cash", {
      id: "cash",
      header: () => (
        <TableTh text="보유 캐시" onSort={() => handleSort("cash")} />
      ),
      cell: (info) => `${info.getValue().toLocaleString()} 원`,
    }),
    columnHelper.accessor("point", {
      id: "point",
      header: () => (
        <TableTh text="보유 포인트" onSort={() => handleSort("point")} />
      ),
      cell: (info) => `${info.getValue().toLocaleString()} P`,
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
    columnHelper.accessor("lastLogin", {
      id: "lastLogin",
      header: () => (
        <TableTh text="마지막 로그인" onSort={() => handleSort("lastLogin")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("manage", {
      id: "manage",
      header: () => <TableTh className="text-center" text="상세 보기" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <Link href={`/user/client/${info.row.original.id}`}>
            <button className="border border-[#ccc] rounded-md px-4 py-2">
              상세페이지 이동
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

  // 마지막 로그인으로 검색
  const handleLastLoginChange = (value: Value) => {
    if (Array.isArray(value)) {
      const start = dateFormat(value[0], "day", "-");
      const end = dateFormat(value[1], "day", "-");

      setLastLogin({
        start,
        end,
      });
      setCustomParams(["lStart", "lEnd", "page"], [start, end, "1"]);
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
    // 마지막 로그인 검색 초기화
    setLastLogin(DEFAULT_DATE);

    // 1페이지로 이동 후 params 초기화
    setCustomParams("page", "1", [
      "type",
      "keyword",
      "lStart",
      "lEnd",
      "cStart",
      "cEnd",
    ]);
  };

  return (
    <Card className="min-h-[87vh]">
      <div className="w-full h-full scroll-bar flex flex-col gap-5">
        <div className="flex justify-between items-end">
          <div className="text-lg font-bold">
            광고주 등록 수 : {total.toLocaleString()}명
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
            <CalendarInput
              endDate={lastLogin.end ? lastLogin.end : ""}
              placeholder="마지막 로그인 검색"
              range={true}
              required={true}
              startDate={lastLogin.start ? lastLogin.start : ""}
              width="w-64"
              onChange={(value) => handleLastLoginChange(value)}
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
