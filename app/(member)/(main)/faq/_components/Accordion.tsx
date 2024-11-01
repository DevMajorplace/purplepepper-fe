"use client";

import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Accordion({ question, answer }: AccordionProps) {
  const [open, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (divRef.current) {
      const targetHeight = divRef.current.scrollHeight;

      if (divRef.current.parentElement) {
        open
          ? (divRef.current.parentElement.style.height = `0px`)
          : (divRef.current.parentElement.style.height = `${targetHeight}px`);
      }

      setOpen(!open);
    }
  };

  return (
    <>
      <div
        className="flex justify-between items-center text-xl py-6 font-semibold cursor-pointer"
        role="presentation"
        onClick={handleClick}
      >
        <div>Q. {question}</div>
        <div>
          <IoIosArrowDown
            className={`transition-all duration-300 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <div
        className={`transition-all duration-300 h-0 overflow-hidden border-b border-[#ccc]`}
      >
        <div ref={divRef} className="pb-6 text-xl text-[1.15rem]">
          {answer}
        </div>
      </div>
    </>
  );
}
