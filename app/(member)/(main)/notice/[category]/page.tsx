"use client";

import { useParams, usePathname } from "next/navigation";
import { ChangeEvent, FormEvent, Suspense, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import Link from "next/link";
import { useStore } from "zustand";

import UserDetailTab from "../../user/_components/UserDetailTab";

import Accordion from "./_components/Accordion";
import NoticeLoading from "./_components/NoticeLoading";

import { useUser } from "@/stores/auth.store";
import instance from "@/api/axios";
import Pages from "@/components/Pages";
import useCustomParams from "@/hooks/useCustomParams";
import { categories } from "@/config/site";

const PAGE_RANGE = 5;

export default function Notice() {
  const [notice, setNotice] = useState<
    {
      id: string;
      title: string;
      category: string;
      visible: string[];
      createdAt: string;
    }[]
  >([]);
  const pathname = usePathname();
  const params = useParams();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useStore(useUser, (state) => {
    return state.user;
  });
  const [page, setPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getCustomParams, setCustomParams, createQueryString } =
    useCustomParams();

  const fetchData = async (page: number, keyword?: string) => {
    try {
      const res = await instance.get(
        // eslint-disable-next-line prettier/prettier
        `/boards?page=${page}&pageSize=15&category=${params.category}${keyword ? `&title=${keyword}` : ""}`
      );

      // 공지사항 내용
      setNotice(res.data.data);
      // 총 페이지 수
      setTotalPages(res.data.totalPages);
      // 로딩 끝
      setLoading(false);
    } catch (error: any) {
      //console.log(error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const crrpage = getCustomParams("page");
    const keyword = getCustomParams("keyword");

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

    fetchData(
      Number(crrpage) !== 0 ? Number(crrpage) : 1,
      // eslint-disable-next-line prettier/prettier
      keyword ? keyword : undefined
    );
  }, [getCustomParams("page"), getCustomParams("keyword"), startPage]);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search) {
      setCustomParams(
        ["keyword", "page"],
        // eslint-disable-next-line prettier/prettier
        [search, "1"]
      );
    } else {
      setCustomParams(["page"], ["1"]);
    }
  };

  const TABS = categories.map((item) => {
    return {
      name: item.name,
      link: `/notice/${item.id}`,
      on: pathname === `/notice/${item.id}`,
    };
  });

  return (
    <>
      <div className="flex justify-between">
        <UserDetailTab tabs={TABS} />
        <div className="flex gap-3">
          <form
            className="border border-[#ccc] rounded-md px-4 flex items-center gap-1 h-12"
            onSubmit={(e) => handleSearchSubmit(e)}
          >
            <IoIosSearch className="text-[18px] pt-[1px] search_icon" />
            <input
              className="h-8 px-3 placeholder:text-[#333]/50"
              placeholder="검색어를 입력해주세요."
              type="text"
              value={search}
              onChange={(e) => handleSearchInput(e)}
            />
          </form>
          {user?.role === "admin" && (
            <Link href={`${pathname}/write`}>
              <div className="bg-[#000] text-white rounded-md px-4 flex items-center gap-1 h-12 cursor-pointer">
                <GoPencil className="text-[18px] pt-[1px] search_icon" />{" "}
                공지사항 작성하기
              </div>
            </Link>
          )}
        </div>
      </div>
      <Suspense fallback={<NoticeLoading />}>
        {!loading &&
          notice.map((item, index) => (
            <Accordion
              key={index}
              createdAt={item.createdAt}
              id={item.id}
              title={item.title}
            />
          ))}
      </Suspense>
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
    </>
  );
}
