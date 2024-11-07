"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import Link from "next/link";

import UserDetailTab from "../../user/_components/UserDetailTab";

import Card from "@/components/card";
import { useUser } from "@/stores/auth.store";
import useStore from "@/hooks/useStore";

export default function NoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const user = useStore(useUser, (state) => {
    return state.user;
  });

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${pathname}?keyword=${search}`);
  };

  const TABS = [
    {
      name: "카테고리1",
      link: `/notice/category1`,
      on: pathname === `/notice/category1`,
    },
    {
      name: "카테고리2",
      link: `/notice/category2`,
      on: pathname === `/notice/category2`,
    },
    {
      name: "카테고리3",
      link: `/notice/category3`,
      on: pathname === `/notice/category3`,
    },
    {
      name: "카테고리4",
      link: `/notice/category4`,
      on: pathname === `/notice/category4`,
    },
    {
      name: "카테고리5",
      link: `/notice/category5`,
      on: pathname === `/notice/category5`,
    },
  ];

  return (
    <Card className="min-h-[87vh] gap-5">
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
          {user?.level === 10 && (
            <Link href={"/notice/write"}>
              <div className="bg-[#000] text-white rounded-md px-4 flex items-center gap-1 h-12 cursor-pointer">
                <GoPencil className="text-[18px] pt-[1px] search_icon" />{" "}
                공지사항 작성하기
              </div>
            </Link>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
}
