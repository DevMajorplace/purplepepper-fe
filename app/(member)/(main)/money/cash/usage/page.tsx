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

type RowObj = {
  chk: ReactElement; // 체크 박스
  idx: string; // IDX
  missionIdx: string; // 대상 미션 IDX
  missionName: string; // 대상 미션명
  productIdx: string; // 상품 IDX
  productName: string; // 상품명
  clientIdx: string; // 광고주 IDX
  clientName: string; // 광고주 IDX
  useType: string; // 변동 분류
  price: number; // 변동액
  createdAt: string; // 발생일시
  result: string; // 처리결과
  errorLog: string; // 오류사유
  ProcessedAt: string; // 처리일시
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    idx: "idx1",
    missionIdx: "미션 idx1",
    missionName: "미션명1",
    productIdx: "상품 idx1",
    productName: "상품명1",
    clientIdx: "광고주 idx1",
    clientName: "광고주명1",
    useType: "사용",
    price: -10000,
    createdAt: "2024-10-28 09:00:00",
    result: "정상",
    errorLog: "",
    ProcessedAt: "2024-10-28 09:01:00",
  },
  {
    idx: "idx2",
    missionIdx: "미션 idx2",
    missionName: "미션명2",
    productIdx: "상품 idx2",
    productName: "상품명2",
    clientIdx: "광고주 idx2",
    clientName: "광고주명2",
    useType: "환급",
    price: 10000,
    createdAt: "2024-10-28 09:00:00",
    result: "오류",
    errorLog: "미션 등록 오류",
    ProcessedAt: "2024-10-28 09:01:00",
  },
];
const DEFAULT_FILTER = {
  type: "idx",
  keyword: "",
  show: false,
};
const DEFAULT_CREATEDATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function MoneyCashUsage() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [chk, setChk] = useState<string[]>([]);
  const [createdAt, setCreatedAt] = useState<{
    start: string | null;
    end: string | null;
  }>(DEFAULT_CREATEDATE);
  const [search, setSearch] = useState<{
    type: string;
    keyword: string;
    show: boolean;
  }>(DEFAULT_FILTER);
  const [page, setPage] = useState(1);
  const [totalUsage, setTotalUsage] = useState(0);
  const [useType, setUseType] = useState("all");
  const [result, setResult] = useState("all");
  const [startPage, setStartPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const { getCustomParams, setCustomParams, createQueryString } =
    useCustomParams();

  useEffect(() => {
    const crrpage = getCustomParams("page");
    const cStart = getCustomParams("cStart");
    const cEnd = getCustomParams("cEnd");
    const useType = getCustomParams("useType");
    const result = getCustomParams("result");
    const type = getCustomParams("type");
    const keyword = getCustomParams("keyword");

    // 발생시점 Params가 있으면
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

    // 변동 분류 Params가 있으면
    if (useType) {
      setUseType(useType);
    }

    // 처리결과 Params가 있으면
    if (result) {
      setResult(result);
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
    getCustomParams("useType"),
    getCustomParams("result"),
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
    columnHelper.accessor("missionIdx", {
      id: "missionIdx",
      header: () => (
        <TableTh text="대상 미션 IDX" onSort={() => handleSort("missionIdx")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("missionName", {
      id: "missionName",
      header: () => (
        <TableTh text="대상 미션명" onSort={() => handleSort("missionName")} />
      ),
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
    columnHelper.accessor("useType", {
      id: "useType",
      header: () => (
        <TableTh text="변동 분류" onSort={() => handleSort("useType")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: () => (
        <TableTh text="변동액" onSort={() => handleSort("price")} />
      ),
      cell: (info) => `${info.getValue().toLocaleString()}원`,
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <TableTh text="발생시점" onSort={() => handleSort("createdAt")} />
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
    columnHelper.accessor("result", {
      id: "result",
      header: () => (
        <TableTh text="처리결과" onSort={() => handleSort("result")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("ProcessedAt", {
      id: "ProcessedAt",
      header: () => (
        <TableTh text="처리시점" onSort={() => handleSort("ProcessedAt")} />
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
    columnHelper.accessor("errorLog", {
      id: "errorLog",
      header: () => <TableTh text="오류사유" />,
      cell: (info) => info.getValue(),
    }),
  ];

  // 변동 분류 수정시
  const handleUseTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setUseType(e.target.value);
    setCustomParams(["useType", "page"], [value, "1"]);
  };

  // 처리 결과 수정시
  const handleResultChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setResult(e.target.value);
    setCustomParams(["result", "page"], [value, "1"]);
  };

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
    setCreatedAt(DEFAULT_CREATEDATE);
    // 변동 분류 초기화
    setUseType("all");
    // 처리 결과 초기화
    setResult("all");

    // 1페이지로 이동 후 params 초기화
    setCustomParams("page", "1", [
      "type",
      "keyword",
      "cStart",
      "cEnd",
      "useType",
      "result",
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="text-lg font-bold">
          캐시 이용액 : {totalUsage.toLocaleString()}원
        </div>
        <div className="flex justify-between items-end">
          <div className="flex gap-3">
            <TableSelect
              label={"변동 분류"}
              name={"useType"}
              options={[
                { value: "all", name: "전체" },
                { value: "usage", name: "사용" },
                { value: "refund", name: "환급" },
              ]}
              value={useType}
              onChange={(e) => handleUseTypeChange(e)}
            />
            <TableSelect
              label={"처리 결과"}
              name={"result"}
              options={[
                { value: "all", name: "전체" },
                { value: "success", name: "정상" },
                { value: "error", name: "오류" },
              ]}
              value={result}
              onChange={(e) => handleResultChange(e)}
            />
          </div>
          <div className="flex gap-3">
            <CalendarInput
              endDate={createdAt.end ? createdAt.end : ""}
              placeholder="발생시점 검색"
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
                  className={`items-center gap-2 flex search_form`}
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <select
                    className="h-8"
                    value={search.type}
                    onChange={(e) => handleSelect(e)}
                  >
                    <option value="idx">IDX</option>
                    <option value="missionIdx">대상 미션 IDX</option>
                    <option value="missionName">대상 미션명</option>
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
  );
}
