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
import { IoIosSearch, IoIosClose, IoMdArrowBack } from "react-icons/io";
import { RiRefreshLine } from "react-icons/ri";
import Link from "next/link";
import { useParams } from "next/navigation";

import MissionTypeEditModal from "../_components/MissionTypeEditModal";
import MissionTypeAddModal from "../_components/MissionTypeAddModal";

import Pages from "@/components/Pages";
import CalendarInput, { dateFormat } from "@/components/Input/CalendarInput";
import useCustomParams from "@/hooks/useCustomParams";
import TableTh from "@/app/(member)/(main)/_components/TableTh";
import Table from "@/app/(member)/(main)/_components/Table";
import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import { HiOutlinePlus } from "react-icons/hi2";

type RowObj = {
  idx: string; // 체크 박스
  name: string; // 증분류명
  small: number; // 하위 중분류 수
  createdAt: string; // 등록일시
  isUse: boolean; // 사용 여부
  used: boolean; // 사용 내역 여부
  edit: ReactElement; // 수정 버튼
  add: ReactElement; // 분류 추가 버튼
  data: ReactElement; // 매출데이터
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    idx: "중분류 idx1",
    name: "중분류명",
    small: 10,
    createdAt: "2024-10-28 09:00:00",
    isUse: true,
    used: false,
  },
];
// 검색 초기값 - 중분류명
const DEFAULT_FILTER = {
  type: "middle",
  keyword: "",
  show: false,
};
const DEFAULT_DATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function MissionTypeMajor() {
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
  const [page, setPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const { getCustomParams, setCustomParams, createQueryString } =
    useCustomParams();
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();
  const { major } = useParams();

  useEffect(() => {
    const crrpage = getCustomParams("page");
    const cStart = getCustomParams("cStart");
    const cEnd = getCustomParams("cEnd");
    const type = getCustomParams("type");
    const keyword = getCustomParams("keyword");

    // 참여일시 Params가 있으면
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

  // 수정 클릭시
  const handleEditClick = (
    idx: string,
    name: string,
    isUse: boolean,
    // eslint-disable-next-line prettier/prettier
    used: boolean
  ) => {
    setModalOpen(true);
    setModalContents(
      // eslint-disable-next-line prettier/prettier
      <MissionTypeEditModal info={{ idx, name, isUse, used }} />
    );
  };

  // 하위 분류 추가 클릭시
  const handleAddClick = (middle: string) => {
    setModalOpen(true);
    setModalContents(
      // eslint-disable-next-line prettier/prettier
      <MissionTypeAddModal major={decodeURI(major as string)} middle={middle} />
    );
  };

  const COLUMNS = [
    columnHelper.accessor("idx", {
      id: "idx",
      header: () => (
        <TableTh text="중분류 IDX" onSort={() => handleSort("idx")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <TableTh text="중분류명" onSort={() => handleSort("name")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("small", {
      id: "small",
      header: () => (
        <TableTh text="하위 소분류 수" onSort={() => handleSort("small")} />
      ),
      cell: (info) => (
        <Link href={`/mission/type/${major}/${info.row.original.idx}`}>
          {info.getValue().toLocaleString()}
        </Link>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <TableTh text="등록일시" onSort={() => handleSort("createdAt")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isUse", {
      id: "isUse",
      header: () => (
        <TableTh text="분류 사용 상태" onSort={() => handleSort("isUse")} />
      ),
      cell: (info) => (info.getValue() ? "활성화" : "비활성화"),
    }),
    columnHelper.accessor("edit", {
      id: "edit",
      header: () => <TableTh className="text-center" text="수정" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <button
            className="border border-[#ccc] rounded-md px-4 py-2"
            onClick={() =>
              handleEditClick(
                info.row.original.idx,
                info.row.original.name,
                info.row.original.isUse,
                // eslint-disable-next-line prettier/prettier
                info.row.original.used
              )
            }
          >
            수정
          </button>
        </div>
      ),
    }),
    columnHelper.accessor("add", {
      id: "add",
      header: () => <TableTh className="text-center" text="하위 분류 추가" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <button
            className="border border-[#ccc] rounded-md px-4 py-2"
            onClick={() => handleAddClick(info.row.original.idx)}
          >
            분류 추가
          </button>
        </div>
      ),
    }),
    columnHelper.accessor("data", {
      id: "data",
      header: () => <TableTh className="text-center" text="매출 데이터" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <Link
            className="border border-[#ccc] rounded-md px-4 py-2"
            href={`/mission/`}
          >
            매출보기
          </Link>
        </div>
      ),
    }),
  ];

  // 등록일시로 검색
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
    // 참여일시 검색 초기화
    setCreatedAt(DEFAULT_DATE);

    // 1페이지로 이동 후 params 초기화
    setCustomParams("page", "1", ["type", "keyword", "cStart", "cEnd"]);
  };

  // 분류 추가 클릭시
  const handleTypeAddClick = () => {
    setModalOpen(true);
    setModalContents(
      // eslint-disable-next-line prettier/prettier
      <MissionTypeAddModal major={decodeURI(major as string)} />
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <div>
            <Link href={`/mission/type`}>
              <button className="bg-[#18181B] text-white rounded-md px-4 flex items-center gap-1 cursor-pointer h-12">
                <IoMdArrowBack className="text-[18px] pt-[1px]" /> 이전 단계로
                돌아가기
              </button>
            </Link>
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
                    <option value="middle">중분류</option>
                    <option value="small">소분류</option>
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
            <div
              className="border border-[#ccc] rounded-md px-4 flex items-center gap-1 cursor-pointer h-12"
              role="presentation"
              onClick={handleTypeAddClick}
            >
              <HiOutlinePlus className="text-[18px] pt-[1px]" /> 분류 추가
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
