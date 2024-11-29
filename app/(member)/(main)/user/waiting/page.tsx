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
import { RiRefreshLine, RiCheckFill } from "react-icons/ri";

import TableTh from "../../_components/TableTh";
import Table from "../../_components/Table";

import WaitingApprovalModal from "./_components/WaitingApprovalModal";
import WaitingRefusalModal from "./_components/WaitingRefusalModal";
import WaitingCertificateModal from "./_components/WaitingCertificateModal";
import WaitingChkApprovalModal from "./_components/WaitingChkApprovalModal";
import WaitingChkRefusalModal from "./_components/WaitingChkRefusalModal";

import Card from "@/components/card";
import Pages from "@/components/Pages";
import CalendarInput, { dateFormat } from "@/components/Input/CalendarInput";
import useCustomParams from "@/hooks/useCustomParams";
import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import OnOffButton from "@/components/button/OnOffButton";
import instance from "@/api/axios";
import formatDate from "@/utils/formatDate";

type ModalInfo = {
  id: string;
  company: string;
  name: string;
  recommendId: string;
};

type RowObj = {
  chk: ReactElement;
  id: string; // 회원아이디
  company: string; // 업체명
  name: string; // 담당자명
  phone: string; // 담당자 연락처
  recommendId: string; // 추천인 아이디
  createdAt: string; // 가입요청일시
  certificate: string; // 사업자등록증
  approval: ModalInfo; // 승인
  refusal: ModalInfo; // 거절
};

type RefusalRowObj = {
  id: string; // 회원아이디
  company: string; // 업체명
  name: string; // 담당자명
  phone: string; // 담당자 연락처
  recommendId: string; // 추천인 아이디
  createdAt: string; // 가입요청일시
  certificate: string; // 사업자등록증
  refusalAt: string; // 거절일시
  reason: string; // 거절 사유
};

const columnHelper = createColumnHelper<RowObj>();
const refusalColumnHelper = createColumnHelper<RefusalRowObj>();

const DEFAULT_DATA = [
  {
    id: "", // 회원아이디
    company: "", // 업체명
    name: "", // 담당자명
    phone: "", // 담당자 연락처
    recommendId: "", // 추천인 아이디
    createdAt: "", // 등록일
    certificate: "", // 사업자등록증
  },
];
const DEFAULT_REFUSAL_DATA = [
  {
    id: "", // 회원아이디
    company: "", // 업체명
    name: "", // 담당자명
    phone: "", // 담당자 연락처
    recommendId: "", // 추천인 아이디
    createdAt: "", // 등록일
    certificate: "", // 사업자등록증
    refusalAt: "", // 거절일시
    reason: "", // 거절 사유
  },
];
const DEFAULT_FILTER = {
  type: "id",
  keyword: "",
  show: false,
};
const DEFAULT_DATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function WaitingListPage() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [chk, setChk] = useState<string[]>([]);
  const [refusalMode, setRefusalMode] = useState(false);
  const [refusalData, setRefusalData] = useState(DEFAULT_REFUSAL_DATA);
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
  const [totalPages, setTotalPages] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const { getCustomParams, setCustomParams, createQueryString } =
    useCustomParams();
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  const fetchData = async (page: number, params?: string) => {
    try {
      const res = await instance.get(
        // eslint-disable-next-line prettier/prettier
        `/admin/status?page=${page}&pageSize=15&status=${!refusalMode ? "pending" : "declined"}`
      );

      !refusalMode
        ? setData(
            res.data.data.map(
              (item: {
                user_id: string;
                company_name: string;
                manager_name: string;
                manager_contact: string;
                parent_id: string;
                created_at: string;
                business_registration: string;
              }) => {
                return {
                  id: item.user_id,
                  company: item.company_name,
                  name: item.manager_name,
                  phone: item.manager_contact,
                  recommendId: item.parent_id,
                  createdAt: item.created_at,
                  certificate: item.business_registration,
                };
                // eslint-disable-next-line prettier/prettier
              }
              // eslint-disable-next-line prettier/prettier
            )
          )
        : setRefusalData(
            res.data.data.map(
              (item: {
                user_id: string;
                company_name: string;
                manager_name: string;
                manager_contact: string;
                parent_id: string;
                created_at: string;
                business_registration: string;
                decliend_at: string;
                rejection_reason: string;
              }) => {
                return {
                  id: item.user_id,
                  company: item.company_name,
                  name: item.manager_name,
                  phone: item.manager_contact,
                  recommendId: item.parent_id,
                  createdAt: item.created_at,
                  certificate: item.business_registration,
                  refusalAt: item.decliend_at,
                  reason: item.rejection_reason,
                };
                // eslint-disable-next-line prettier/prettier
              }
              // eslint-disable-next-line prettier/prettier
            )
          );

      // 총 인원
      setTotal(res.data.totalItems);
      // 총 페이지 수
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      //console.log(error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const paramsNames = [];
    const paramsValues = [];
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

    fetchData(Number(crrpage) !== 0 ? Number(crrpage) : 1);
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
          checked={data.length !== 0 && chk.length === data.length}
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
    columnHelper.accessor("recommendId", {
      id: "recommendId",
      header: () => (
        <TableTh text="추천인 아이디" onSort={() => handleSort("name")} />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <TableTh text="가입요청일시" onSort={() => handleSort("createdAt")} />
      ),
      cell: (info) => {
        return formatDate(info.getValue());
      },
    }),
    columnHelper.accessor("certificate", {
      id: "certificate",
      header: () => <TableTh className="text-center" text="사업자등록증" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <button
            className="border border-[#ccc] rounded-md px-4 py-2"
            onClick={() => handleCerificateClick(info.getValue())}
          >
            이미지 보기
          </button>
        </div>
      ),
    }),
    columnHelper.accessor("approval", {
      id: "approval",
      header: () => <TableTh className="text-center" text="승인" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <button
            className="border border-[#ddd] bg-[#F0FDF4] text-[#15803D] rounded-md px-4 py-2"
            onClick={() =>
              handleApprovalClick({
                id: info.row.original.id,
                company: info.row.original.company,
                name: info.row.original.name,
                recommendId: info.row.original.recommendId,
              })
            }
          >
            가입승인
          </button>
        </div>
      ),
    }),
    columnHelper.accessor("refusal", {
      id: "refusal",
      header: () => <TableTh className="text-center" text="거절" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <button
            className="bg-[#DC2626] text-white rounded-md px-4 py-2"
            onClick={() =>
              handleRefusalClick({
                id: info.row.original.id,
                company: info.row.original.company,
                name: info.row.original.name,
                recommendId: info.row.original.recommendId,
              })
            }
          >
            가입거절
          </button>
        </div>
      ),
    }),
  ];

  const REFUSAL_COLUMNS = [
    refusalColumnHelper.accessor("id", {
      id: "id",
      header: () => <TableTh text="아이디" onSort={() => handleSort("id")} />,
      cell: (info) => info.getValue(),
    }),
    refusalColumnHelper.accessor("company", {
      id: "company",
      header: () => (
        <TableTh text="업체명" onSort={() => handleSort("company")} />
      ),
      cell: (info) => info.getValue(),
    }),
    refusalColumnHelper.accessor("name", {
      id: "name",
      header: () => (
        <TableTh text="담당자명" onSort={() => handleSort("name")} />
      ),
      cell: (info) => info.getValue(),
    }),
    refusalColumnHelper.accessor("phone", {
      id: "phone",
      header: () => <TableTh text="담당자 연락처" />,
      cell: (info) => info.getValue(),
    }),
    refusalColumnHelper.accessor("recommendId", {
      id: "recommendId",
      header: () => (
        <TableTh text="추천인 아이디" onSort={() => handleSort("name")} />
      ),
      cell: (info) => info.getValue(),
    }),
    refusalColumnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <TableTh text="가입요청일시" onSort={() => handleSort("createdAt")} />
      ),
      cell: (info) => info.getValue(),
    }),
    refusalColumnHelper.accessor("certificate", {
      id: "certificate",
      header: () => <TableTh className="text-center" text="사업자등록증" />,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <button
            className="border border-[#ccc] rounded-md px-4 py-2"
            onClick={() => handleCerificateClick(info.getValue())}
          >
            이미지 보기
          </button>
        </div>
      ),
    }),
    refusalColumnHelper.accessor("refusalAt", {
      id: "refusalAt",
      header: () => (
        <TableTh text="거절처리일시" onSort={() => handleSort("refusalAt")} />
      ),
      cell: (info) => info.getValue(),
    }),
    refusalColumnHelper.accessor("reason", {
      id: "reason",
      header: () => <TableTh text="거절사유" />,
      cell: (info) => info.getValue(),
    }),
  ];

  // 가입요청일시로 검색
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
    // 가입요청일시 검색 초기화
    setCreatedAt(DEFAULT_DATE);

    // 1페이지로 이동 후 params 초기화
    setCustomParams("page", "1", ["type", "keyword", "cStart", "cEnd"]);
  };

  // 일괄승인 클릭
  const handleChkApprovalClick = () => {
    const count = chk.length;

    if (!count) {
      alert("선택된 요청이 없습니다.");

      return false;
    }

    setModalOpen(true);
    setModalContents(<WaitingChkApprovalModal info={chk} />);
  };

  // 일괄거절 클릭
  const handleChkRefusalClick = () => {
    const count = chk.length;

    if (!count) {
      alert("선택된 요청이 없습니다.");

      return false;
    }

    setModalOpen(true);
    setModalContents(<WaitingChkRefusalModal info={chk} />);
  };

  // 거절된 가입요청만 보기 클릭
  const handleRefusalModeClick = () => {
    setRefusalMode(!refusalMode);
  };

  // 사업자 등록증 확인 클릭
  const handleCerificateClick = (src: string) => {
    setModalOpen(true);
    setModalContents(<WaitingCertificateModal src={src} />);
  };

  // 승인 클릭
  const handleApprovalClick = (info: ModalInfo) => {
    setModalOpen(true);
    setModalContents(<WaitingApprovalModal info={info} />);
  };

  // 거절 클릭
  const handleRefusalClick = (info: ModalInfo) => {
    setModalOpen(true);
    setModalContents(<WaitingRefusalModal info={info} />);
  };

  return (
    <Card className="min-h-[87vh]">
      <div className="w-full h-full scroll-bar flex flex-col gap-5">
        <div className="flex justify-between items-end">
          <div className="text-lg font-bold">
            {!refusalMode
              ? `가입 대기자 수 : ${total.toLocaleString()}명`
              : `거절된 가입자 수 : ${total.toLocaleString()}명`}
          </div>
          <div className="flex gap-3 items-center">
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
              className={`border border-[#ccc] rounded-md flex items-center cursor-pointer h-12`}
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
                    <option value="company">업체명</option>
                    <option value="name">담당자명</option>
                    <option value="phone">담당자 연락처</option>
                    <option value="recommendId">추천인 아이디</option>
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
            {!refusalMode && (
              <>
                <div
                  className="border border-[#ddd] bg-[#F0FDF4] text-[#15803D] flex items-center rounded-md px-4 h-12 cursor-pointer"
                  role="presentation"
                  onClick={handleChkApprovalClick}
                >
                  <RiCheckFill className="text-[18px] pt-[1px]" /> 선택 요청
                  일괄승인
                </div>
                <div
                  className="bg-[#DC2626] text-white flex items-center rounded-md px-4 h-12 cursor-pointer"
                  role="presentation"
                  onClick={handleChkRefusalClick}
                >
                  <RiCheckFill className="text-[18px] pt-[1px]" /> 선택 요청
                  일괄거절
                </div>
              </>
            )}
            <div
              className="flex gap-2 items-center cursor-pointer"
              role="presentation"
              onClick={handleRefusalModeClick}
            >
              <OnOffButton on={refusalMode} />
              거절된 가입요청만 보기
            </div>
          </div>
        </div>
        <Table
          tableClass={"[&_td]:py-3"}
          tableData={
            !refusalMode
              ? { data, columns: COLUMNS }
              : { data: refusalData, columns: REFUSAL_COLUMNS }
          }
        />
        {totalPages > 1 && (
          <Pages
            activePage={Number(page) === 0 ? 1 : Number(page)}
            className="pt-4"
            createQueryString={createQueryString}
            pageRange={PAGE_RANGE}
            startPage={startPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </Card>
  );
}
