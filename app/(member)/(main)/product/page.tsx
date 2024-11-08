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
import { TbCubePlus } from "react-icons/tb";
import { RiRefreshLine } from "react-icons/ri";
import Link from "next/link";

import Pages from "@/components/Pages";
import CalendarInput, { dateFormat } from "@/components/Input/CalendarInput";
import useCustomParams from "@/hooks/useCustomParams";
import TableTh from "@/app/(member)/(main)/_components/TableTh";
import Table from "@/app/(member)/(main)/_components/Table";
import Card from "@/components/card";
import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import AffiliateListModal from "./_components/AffiliateListModal";

type RowObj = {
  chk: ReactElement; // 체크 박스
  idx: string; // 상품 IDX
  name: string; // 상품명
  createdAt: string; // 등록일시
  displayStartDate: string; // 노출 시작 일시
  displayEndDate: string; // 노출 종료 일시
  missions: number; // 사용 중인 미션 수
  pointDistribution: number[]; // 포인트 분배 비율
  salse: number; // 누적 매출
  profit: number; // 누적 순이익
  affiliate: ReactElement; // 구성 매체사
  manage: ReactElement; // 수정
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    idx: "상품 idx1",
    name: "상품명",
    createdAt: "2024-10-10 09:00:00",
    displayStartDate: "2024-10-10 09:00:00",
    displayEndDate: "2024-10-10 09:00:00",
    missions: 1000,
    pointDistribution: [5, 3, 2],
    salse: 100000,
    profit: 100000,
  },
  {
    idx: "상품 idx1",
    name: "상품명",
    createdAt: "2024-10-10 09:00:00",
    displayStartDate: "2024-10-10 09:00:00",
    displayEndDate: "-",
    missions: 1000,
    pointDistribution: [5, 3, 2],
    salse: 100000,
    profit: 100000,
  },
];
const DEFAULT_FILTER = {
  type: "idx",
  keyword: "",
  show: false,
};
const DEFAULT_DATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function ProductList() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [chk, setChk] = useState<string[]>([]);
  const [createdAt, setCreatedAt] = useState<{
    start: string | null;
    end: string | null;
  }>(DEFAULT_DATE);
  const [displayStartDate, setDisplayStartDate] = useState<{
    start: string | null;
    end: string | null;
  }>(DEFAULT_DATE);
  const [displayEndDate, setDisplayEndDate] = useState<{
    start: string | null;
    end: string | null;
  }>(DEFAULT_DATE);
  const [search, setSearch] = useState<{
    type: string;
    keyword: string;
    show: boolean;
  }>(DEFAULT_FILTER);
  const [page, setPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const { getCustomParams, setCustomParams, createQueryString } =
    useCustomParams();
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  useEffect(() => {
    const crrpage = getCustomParams("page");
    const cStart = getCustomParams("cStart");
    const cEnd = getCustomParams("cEnd");
    const dsStart = getCustomParams("dsStart");
    const dsEnd = getCustomParams("dsEnd");
    const deStart = getCustomParams("deStart");
    const deEnd = getCustomParams("deEnd");
    const type = getCustomParams("type");
    const keyword = getCustomParams("keyword");

    // 등록일 검색 Params가 있으면
    if (cStart && cEnd) {
      setCreatedAt({
        start: cStart,
        end: cEnd,
      });
    }

    // 노출시작 검색 Params가 있으면
    if (dsStart && dsEnd) {
      setDisplayStartDate({
        start: dsStart,
        end: dsEnd,
      });
    }

    // 노출종료 검색 Params가 있으면
    if (deStart && deEnd) {
      setDisplayEndDate({
        start: deStart,
        end: deEnd,
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
    getCustomParams("dsStart"),
    getCustomParams("dsEnd"),
    getCustomParams("deStart"),
    getCustomParams("deEnd"),
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

  // 구성 매체사 목록보기 클릭시
  const handleAffiliateListClick = (idx: string, name: string) => {
    setModalOpen(true);
    setModalContents(<AffiliateListModal idx={idx} name={name} />);
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
    columnHelper.accessor("name", {
      id: "name",
      header: () => <TableTh text="상품명" onSort={() => handleSort("name")} />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <TableTh text="상품등록일시" onSort={() => handleSort("createdAt")} />
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
    columnHelper.accessor("displayStartDate", {
      id: "displayStartDate",
      header: () => (
        <TableTh
          text="노출시작일시"
          onSort={() => handleSort("displayStartDate")}
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
    columnHelper.accessor("displayEndDate", {
      id: "displayEndDate",
      header: () => (
        <TableTh
          text="노출종료일시"
          onSort={() => handleSort("displayEndDate")}
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
    columnHelper.accessor("missions", {
      id: "missions",
      header: () => (
        <TableTh
          text="사용 중인 미션 수"
          onSort={() => handleSort("missions")}
        />
      ),
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("pointDistribution", {
      id: "pointDistribution",
      header: () => <TableTh text="포인트 분배 비율" />,
      cell: (info) => `${info.getValue().join("% / ")}%`,
    }),
    columnHelper.accessor("salse", {
      id: "salse",
      header: () => (
        <TableTh text="누적 매출" onSort={() => handleSort("salse")} />
      ),
      cell: (info) => `${info.getValue().toLocaleString()}원`,
    }),
    columnHelper.accessor("profit", {
      id: "profit",
      header: () => (
        <TableTh text="누적 순이익" onSort={() => handleSort("profit")} />
      ),
      cell: (info) => `${info.getValue().toLocaleString()}원`,
    }),
    columnHelper.accessor("affiliate", {
      id: "affiliate",
      header: () => <TableTh className="text-center" text="구성 매체사" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <button
            className="border border-[#ccc] rounded-md px-4 py-2"
            onClick={() =>
              handleAffiliateListClick(
                info.row.original.idx,
                // eslint-disable-next-line prettier/prettier
                info.row.original.name
              )
            }
          >
            목록보기
          </button>
        </div>
      ),
    }),
    columnHelper.accessor("manage", {
      id: "manage",
      header: () => <TableTh className="text-center" text="수정" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <Link href={`/add/${info.row.original.idx}`}>
            <button className="border border-[#ccc] rounded-md px-4 py-2">
              수정하기
            </button>
          </Link>
        </div>
      ),
    }),
  ];

  // 등록일로 검색
  const handldsCreatedAtChange = (value: Value) => {
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

  // 시작일로 검색
  const handldsStartDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      const start = dateFormat(value[0], "day", "-");
      const end = dateFormat(value[1], "day", "-");

      setDisplayStartDate({
        start,
        end,
      });
      setCustomParams(["dsStart", "dsEnd", "page"], [start, end, "1"]);
      //console.log(pathname);
    }
  };

  // 종료일로 검색
  const handldsEndDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      const start = dateFormat(value[0], "day", "-");
      const end = dateFormat(value[1], "day", "-");

      setDisplayEndDate({
        start,
        end,
      });
      setCustomParams(["deStart", "deEnd", "page"], [start, end, "1"]);
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
    // 등록일 검색 초기화
    setCreatedAt(DEFAULT_DATE);
    // 시작일 검색 초기화
    setDisplayStartDate(DEFAULT_DATE);
    // 종료일 검색 초기화
    setDisplayEndDate(DEFAULT_DATE);

    // 1페이지로 이동 후 params 초기화
    setCustomParams(
      ["page"],
      ["1"],
      [
        "type",
        "keyword",
        "cStart",
        "cEnd",
        "dsStart",
        "dsEnd",
        "deStart",
        "deEnd",
        // eslint-disable-next-line prettier/prettier
      ]
    );
  };

  return (
    <Card className="min-h-[87vh]">
      <div className="w-full h-full flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="text-lg font-bold">
            상품 개수 : {totalProduct.toLocaleString()}개
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-3">
              <CalendarInput
                endDate={createdAt.end ? createdAt.end : ""}
                placeholder="시작일 검색"
                range={true}
                required={true}
                startDate={createdAt.start ? createdAt.start : ""}
                width="w-64"
                onChange={(value) => handldsCreatedAtChange(value)}
              />
              <CalendarInput
                endDate={displayStartDate.end ? displayStartDate.end : ""}
                placeholder="시작일 검색"
                range={true}
                required={true}
                startDate={displayStartDate.start ? displayStartDate.start : ""}
                width="w-64"
                onChange={(value) => handldsStartDateChange(value)}
              />
              <CalendarInput
                endDate={displayEndDate.end ? displayEndDate.end : ""}
                placeholder="종료일 검색"
                range={true}
                required={true}
                startDate={displayEndDate.start ? displayEndDate.start : ""}
                width="w-64"
                onChange={(value) => handldsEndDateChange(value)}
              />
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
                      <option value="idx">상품 IDX</option>
                      <option value="name">상품명</option>
                      <option value="affiliate">매체사명</option>
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
              <Link href={"/product/add"}>
                <div className="bg-[#111] text-white rounded-md px-4 flex items-center gap-1 cursor-pointer h-12">
                  <TbCubePlus className="text-[18px] pt-[1px]" /> 상품 추가
                </div>
              </Link>
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
