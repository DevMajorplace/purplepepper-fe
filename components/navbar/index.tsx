import React from "react";

export default function Navbar({ brandText, button = null }: NavbarProps) {
  return (
    <nav className="sticky top-4 mx-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-3 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <p className="shrink text-[24px] font-bold capitalize text-navy-700 dark:text-white">
          {brandText}
        </p>
      </div>
      {button}
    </nav>
  );
}
