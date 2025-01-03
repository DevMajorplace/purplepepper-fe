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

import ClientParticipant from "./_components/ClientParticipant";
import AdminParticipant from "./_components/AdminParticipant";

import Pages from "@/components/Pages";
import CalendarInput, { dateFormat } from "@/components/Input/CalendarInput";
import TableSelect from "@/components/Select/TableSelect";
import useCustomParams from "@/hooks/useCustomParams";
import MissionTypeSelect from "@/components/Select/MissionTypeSelect";
import { useUser } from "@/stores/auth.store";

const DEFAULT_DATA = [
  {
    idx: "참여자내역 idx1",
    affiliateIdx: "매체사 idx1",
    affiliateName: "매체사명1",
    adid: "adid1",
    clientIdx: "광고주 idx",
    clientName: "광고주명",
    missionIdx: "미션 idx1",
    missionName: "미션명1",
    missionType: {
      major: "대분류",
      middle: "중분류",
      small: "소분류",
    },
    userInputValue: "유저 입력값",
    reward: 100,
    abusing: false,
    response: true,
    ip: "아이피",
    participationDate: "2024-10-10 09:00:00",
  },
  {
    idx: "참여자내역 idx2",
    affiliateIdx: "매체사 idx2",
    affiliateName: "매체사명2",
    adid: "adid2",
    clientIdx: "광고주 idx",
    clientName: "광고주명",
    missionIdx: "미션 idx2",
    missionName: "미션명2",
    missionType: {
      major: "대분류",
      middle: "중분류",
      small: "소분류",
    },
    userInputValue: "유저 입력값",
    reward: 100,
    abusing: false,
    response: true,
    ip: "아이피",
    participationDate: "2024-10-10 09:00:00",
  },
  {
    idx: "참여자내역 idx3",
    affiliateIdx: "매체사 idx3",
    affiliateName: "매체사명3",
    adid: "adid3",
    clientIdx: "광고주 idx",
    clientName: "광고주명",
    missionIdx: "미션 idx3",
    missionName: "미션명3",
    missionType: {
      major: "대분류",
      middle: "중분류",
      small: "소분류",
    },
    userInputValue: "유저 입력값",
    reward: 100,
    abusing: true,
    response: false,
    ip: "아이피",
    participationDate: "2024-10-10 09:00:00",
  },
];
// 검색 초기값 - 매체사 아이디
const DEFAULT_FILTER = {
  type: "adid",
  keyword: "",
  show: false,
};
const DEFAULT_DATE = { start: null, end: null };
const PAGE_RANGE = 5;

export default function MissionParticipant() {
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
  const [abusing, setAbusing] = useState("all");
  const [response, setResponse] = useState("all");
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
    const abusing = getCustomParams("abusing");
    const response = getCustomParams("response");
    const type = getCustomParams("type");
    const keyword = getCustomParams("keyword");

    // 참여일시 검색 Params가 있으면
    if (pStart && pEnd) {
      setParticipationDate({
        start: pStart,
        end: pEnd,
      });
    }

    // 어뷰징 여부 Params가 있으면
    if (abusing) {
      setAbusing(abusing);
    }

    // 응답 확인 Params가 있으면
    if (response) {
      setResponse(response);
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
    getCustomParams("abusing"),
    getCustomParams("response"),
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

  // 어뷰징 여부 수정시
  const handleAbusingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setAbusing(e.target.value);
    setCustomParams(["abusing", "page"], [value, "1"]);
  };

  // 응답 확인 수정시
  const handleResponseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setResponse(e.target.value);
    setCustomParams(["response", "page"], [value, "1"]);
  };

  // 참여일시 검색
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
    // 어뷰징 여부 초기화
    setAbusing("all");
    // 응답 확인 초기화
    setResponse("all");

    // 1페이지로 이동 후 params 초기화
    setCustomParams("page", "1", [
      "type",
      "keyword",
      "pStart",
      "pEnd",
      "abusing",
      "response",
      "major",
      "middle",
      "small",
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="flex flex-col gap-3">
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
        </div>
        <div className="flex justify-between items-end">
          <div className="flex gap-3">
            <TableSelect
              label={"어뷰징 여부"}
              name={"abusing"}
              options={[
                { value: "all", name: "전체" },
                { value: "true", name: "정상" },
                { value: "false", name: "어뷰징" },
              ]}
              value={abusing}
              onChange={(e) => handleAbusingChange(e)}
            />
            <TableSelect
              label={"응답 확인"}
              name={"response"}
              options={[
                { value: "all", name: "전체" },
                { value: "true", name: "성공" },
                { value: "false", name: "실패" },
              ]}
              value={response}
              onChange={(e) => handleResponseChange(e)}
            />
            {/* 미션 분류 */}
            <MissionTypeSelect />
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
                    {user.role === "client" && (
                      <>
                        <option value="adid">ADID</option>
                        <option value="missionName">미션명</option>
                      </>
                    )}
                    {user.role === "admin" && (
                      <>
                        <option value="adid">ADID</option>
                        <option value="affiliateIdx">매체사 IDX</option>
                        <option value="affiliateName">매체사명</option>
                        <option value="clientIdx">광고주 IDX</option>
                        <option value="clientName">광고주명</option>
                        <option value="missionIdx">미션 IDX</option>
                        <option value="missionName">미션명</option>
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
            <div className="border border-[#ccc] rounded-md px-4 flex items-center gap-1 cursor-pointer h-12">
              <PiDownloadSimple className="text-[18px] pt-[1px]" /> 엑셀
              다운로드
            </div>
          </div>
        </div>
      </div>

      {user.role === "client" && (
        <ClientParticipant
          chk={chk}
          data={data}
          handleAllChkChange={handleAllChkChange}
          handleChkChange={handleChkChange}
          handleSort={handleSort}
        />
      )}

      {user.role === "admin" && (
        <AdminParticipant
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
