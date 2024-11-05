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
  requesterIdx: string; // 출금 요청 업체 IDX
  requesterName: string; // 출금 요청 업체명
  bank: string; // 은행명
  accountNumber: string; // 계좌번호
  depositor: string; // 예금주명
  price: number; // 출금요청액
  createdAt: string; // 출금요청시점
  state: string; // 처리상태
  ProcessedAt: string; // 처리일시
  reason: string; // 거절사유
};

const columnHelper = createColumnHelper<RowObj>();

const DEFAULT_DATA = [
  {
    idx: "idx1",
    requesterIdx: "출금요청자 idx1",
    requesterName: "출금요청업체명",
    bank: "은행명",
    accountNumber: "계좌번호",
    depositor: "예금주명",
    price: 10000,
    createdAt: "2024-10-28 09:00:00",
    state: "대기",
    ProcessedAt: "2024-10-28 09:01:00",
    reason: "-",
  },
  {
    idx: "idx2",
    requesterIdx: "출금요청자 idx1",
    requesterName: "출금요청업체명",
    bank: "은행명",
    accountNumber: "계좌번호",
    depositor: "예금주명",
    price: 10000,
    createdAt: "2024-10-28 09:00:00",
    state: "승인",
    ProcessedAt: "2024-10-28 09:01:00",
    reason: "-",
  },
  {
    idx: "idx3",
    requesterIdx: "출금요청자 idx1",
    requesterName: "출금요청업체명",
    bank: "은행명",
    accountNumber: "계좌번호",
    depositor: "예금주명",
    price: 10000,
    createdAt: "2024-10-28 09:00:00",
    state: "거절",
    ProcessedAt: "2024-10-28 09:01:00",
    reason: "거절 사유",
  },
];
const DEFAULT_FILTER = {
  type: "idx",
  keyword: "",
  show: false,
};
const DEFAULT_CREATEDATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function ClientPointWithdrawal() {
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
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [state, setState] = useState("all");
  const [startPage, setStartPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const { getCustomParams, setCustomParams, createQueryString } =
    useCustomParams();

  useEffect(() => {
    const crrpage = getCustomParams("page");
    const cStart = getCustomParams("cStart");
    const cEnd = getCustomParams("cEnd");
    const state = getCustomParams("state");
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

    // 처리 상태 Params가 있으면
    if (state) {
      setState(state);
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
    getCustomParams("state"),
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
    columnHelper.accessor("requesterIdx", {
      id: "requesterIdx",
      header: () => <TableTh text="출금요청자 IDX" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("requesterName", {
      id: "requesterName",
      header: () => <TableTh text="출금요청업체명" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("bank", {
      id: "bank",
      header: () => <TableTh text="은행명" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("accountNumber", {
      id: "accountNumber",
      header: () => <TableTh text="계좌번호" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("depositor", {
      id: "depositor",
      header: () => <TableTh text="예금주명" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: () => (
        <TableTh text="출금요청액" onSort={() => handleSort("price")} />
      ),
      cell: (info) => `${info.getValue().toLocaleString()}원`,
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <TableTh text="출금 요청시점" onSort={() => handleSort("createdAt")} />
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
    columnHelper.accessor("state", {
      id: "state",
      header: () => (
        <TableTh text="처리상태" onSort={() => handleSort("state")} />
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
    columnHelper.accessor("reason", {
      id: "reason",
      header: () => <TableTh text="거절사유" />,
      cell: (info) => info.getValue(),
    }),
  ];

  // 처리 상태 수정시
  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setState(e.target.value);
    setCustomParams(["state", "page"], [value, "1"]);
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
    // 처리 상태 초기화
    setState("all");

    // 1페이지로 이동 후 params 초기화
    setCustomParams("page", "1", [
      "type",
      "keyword",
      "cStart",
      "cEnd",
      "state",
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="text-lg font-bold">
          포인트 출금액 : {totalWithdrawal.toLocaleString()}원
        </div>
        <div className="flex justify-between items-end">
          <div className="flex gap-3">
            <TableSelect
              label={"처리 상태"}
              name={"state"}
              options={[
                { value: "all", name: "전체" },
                { value: "pending", name: "대기" },
                { value: "approval", name: "승인" },
                { value: "rejection", name: "거절" },
              ]}
              value={state}
              onChange={(e) => handleStateChange(e)}
            />
          </div>
          <div className="flex gap-3">
            <CalendarInput
              endDate={createdAt.end ? createdAt.end : ""}
              placeholder="출금요청시점 검색"
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
                    <option value="reason">거절사유</option>
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
