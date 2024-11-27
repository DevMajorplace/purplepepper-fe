"use client";

import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useUser } from "@/stores/auth.store";
import useStore from "@/hooks/useStore";
import instance from "@/api/axios";

export default function Accordion({ id, title, createdAt }: AccordionProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<string>();
  const divRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const user = useStore(useUser, (state) => {
    return state.user;
  });

  const fetchData = async () => {
    try {
      const res = await instance.get(
        // eslint-disable-next-line prettier/prettier
        `/boards/${id}`
      );

      setContent(res.data.content);
    } catch (error: any) {
      //console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleClick = async () => {
    if (divRef.current) {
      const targetHeight = divRef.current.scrollHeight;

      if (divRef.current.parentElement) {
        if (open) {
          divRef.current.parentElement.style.height = `0px`;
          setContent("");
        } else {
          await fetchData();
          divRef.current.parentElement.style.height = `${targetHeight}px`;
        }
      }

      setOpen(!open);
    }
  };

  return (
    <>
      <div
        className="flex justify-between items-center text-xl py-6 font-semibold cursor-pointer px-4"
        role="presentation"
        onClick={handleClick}
      >
        <div>{title}</div>
        <div className="flex gap-4 items-center">
          <div>{createdAt}</div>
          <IoIosArrowDown
            className={`transition-all duration-300 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <div
        className={`transition-all duration-300 h-0 overflow-hidden border-b border-[#ccc] px-4`}
      >
        <div
          ref={divRef}
          className="pb-6 text-xl text-[1.15rem] flex flex-col gap-2"
        >
          {content}
          {user?.role === "admin" && (
            <div className="text-right">
              <Link
                className="bg-[#000] text-[12px] text-white rounded-md px-4 inline-flex items-center gap-1 h-10 cursor-pointer"
                href={`${path}/write?id=${id}`}
              >
                수정
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
