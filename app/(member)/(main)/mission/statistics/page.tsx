"use client";

import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { PiDownloadSimple } from "react-icons/pi";
import { RiRefreshLine } from "react-icons/ri";
import { useStore } from "zustand";

import ClientStatistics from "./_components/ClientStatistics";
import AdminStatistics from "./_components/AdminStatistics";

import Pages from "@/components/Pages";
import CalendarInput, { dateFormat } from "@/components/Input/CalendarInput";
import useCustomParams from "@/hooks/useCustomParams";
import { useUser } from "@/stores/auth.store";

const DEFAULT_DATA = [
  {
    idx: "통계 idx1",
    recommnedIdx: "직상위 사용자 idx",
    recommnedName: "직상위 사용자명",
    affiliateIdx: "매체사 idx",
    affiliateName: "매체사명",
    missionIdx: "미션 idx",
    missionName: "미션명",
    clientIdx: "광고주 idx",
    clientName: "광고주명",
    landingCount: 100,
    participationCount: 100,
    participationDate: "2024-10-28 09:00:00",
  },
  {
    idx: "통계 idx2",
    recommnedIdx: "직상위 사용자 idx",
    recommnedName: "직상위 사용자명",
    affiliateIdx: "매체사 idx",
    affiliateName: "매체사명",
    missionIdx: "미션 idx",
    missionName: "미션명",
    clientIdx: "광고주 idx",
    clientName: "광고주명",
    landingCount: 100,
    participationCount: 100,
    participationDate: "2024-10-28 09:00:00",
  },
  {
    idx: "통계 idx3",
    recommnedIdx: "직상위 사용자 idx",
    recommnedName: "직상위 사용자명",
    affiliateIdx: "매체사 idx",
    affiliateName: "매체사명",
    missionIdx: "미션 idx",
    missionName: "미션명",
    clientIdx: "광고주 idx",
    clientName: "광고주명",
    landingCount: 100,
    participationCount: 100,
    participationDate: "2024-10-28 09:00:00",
  },
];
// 검색 초기값 - 직상위 사용자 idx
const DEFAULT_FILTER = {
  type: "missionName",
  keyword: "",
  show: false,
};
const DEFAULT_DATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function MissionStatistics() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [chk, setChk] = useState<string[]>([]);
  const [participationDate, setParticipationDate] = useState<{
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
  const user = useStore(useUser, (state) => {
    return state.user;
  });

  useEffect(() => {
    const crrpage = getCustomParams("page");
    const pStart = getCustomParams("pStart");
    const pEnd = getCustomParams("pEnd");
    const type = getCustomParams("type");
    const keyword = getCustomParams("keyword");

    // 참여일시 Params가 있으면
    if (pStart && pEnd) {
      setParticipationDate({
        start: pStart,
        end: pEnd,
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
    getCustomParams("pStart"),
    getCustomParams("pEnd"),
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

  // 참여일시로 검색
  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      const start = dateFormat(value[0], "day", "-");
      const end = dateFormat(value[1], "day", "-");

      setParticipationDate({
        start,
        end,
      });
      setCustomParams(["pStart", "pEnd", "page"], [start, end, "1"]);
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
    setParticipationDate(DEFAULT_DATE);

    // 1페이지로 이동 후 params 초기화
    setCustomParams("page", "1", ["type", "keyword", "pStart", "pEnd"]);
  };

  // 엑셀 다운로드 클릭시
  const handleDownloadClick = () => {
    //console.log(chk);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex justify-end items-end">
          <div className="flex gap-3">
            <CalendarInput
              endDate={participationDate.end ? participationDate.end : ""}
              placeholder="참여일시 검색"
              range={true}
              required={true}
              startDate={participationDate.start ? participationDate.start : ""}
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
                    {user.role === "client" && (
                      <>
                        <option value="missionName">미션명</option>
                      </>
                    )}
                    {user.role === "admin" && (
                      <>
                        <option value="recommnedIdx">직상위 사용자 IDX</option>
                        <option value="recommnedName">직상위 사용자명</option>
                        <option value="affiliateIdx">매체사 IDX</option>
                        <option value="affiliateName">매체사명</option>
                        <option value="missionIdx">미션 IDX</option>
                        <option value="missionName">미션명</option>
                        <option value="clientIdx">광고주 IDX</option>
                        <option value="clientName">광고주명</option>
                      </>
                    )}
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
              onClick={handleDownloadClick}
            >
              <PiDownloadSimple className="text-[18px] pt-[1px]" /> 엑셀
              다운로드
            </div>
          </div>
        </div>
      </div>

      {user.role === "client" && (
        <ClientStatistics
          chk={chk}
          data={data}
          handleAllChkChange={handleAllChkChange}
          handleChkChange={handleChkChange}
          handleSort={handleSort}
        />
      )}

      {user.role === "admin" && (
        <AdminStatistics
          chk={chk}
          data={data}
          handleAllChkChange={handleAllChkChange}
          handleChkChange={handleChkChange}
          handleSort={handleSort}
        />
      )}

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
