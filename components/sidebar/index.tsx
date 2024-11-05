/* eslint-disable */

import { HiX } from "react-icons/hi";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import { MouseEvent, useCallback } from "react";
import { usePathname } from "next/navigation";
import User from "./User";
import { useStore } from "zustand";
import { useUser } from "@/stores/auth.store";
import { FiPlus } from "react-icons/fi";

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const user = useStore(useUser, (state) => {
    return state.user;
  });

  const userLevel = user.level;
  const mainNav = pathname.split("/")[1];

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname]
  );

  const activeMain = useCallback(
    (routeName: string) => {
      return routeName?.includes(mainNav);
    },
    [pathname]
  );

  const handleClick = (e: MouseEvent) => {
    let target;
    const eTarget = e.target as HTMLDivElement;
    if (eTarget.classList.contains("group")) {
      target = eTarget;
    } else {
      target = eTarget.closest(".group");
    }

    target && target.classList.toggle("open");
  };

  return (
    <div
      className={`duration-175 w-[280px] linear fixed !z-50 flex min-h-full flex-col bg-white p-5 shadow-2xl shadow-white/5 transition-all border-r border-navy-400/20 dark:!bg-navy-800 dark:text-white ${
        open ? "translate-x-0" : "-translate-x-96 xl:translate-x-0"
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      <div className={`flex items-center justify-center mb-8`}>
        <div className="text-[22px] font-bold uppercase text-navy-700 dark:text-white">
          Majorplace
        </div>
      </div>

      {/* User Info */}
      <User />
      {/* User Info end */}
      <div className="my-5 h-px bg-gray-300 dark:bg-white/30" />

      {userLevel === 2 && (
        <div>
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 text-gray-800 border border-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
              <FiPlus className="text-xl" /> 미션 등록하기
            </button>
            <Link href={"/point/charge"} className="block">
              <button className="w-full py-3 text-gray-800 border border-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
                <FiPlus className="text-xl" /> 포인트 충전하기
              </button>
            </Link>
          </div>
          <div className="my-5 h-px bg-gray-300 dark:bg-white/30" />
        </div>
      )}

      {/* Nav item */}
      <ul className="mb-auto flex flex-col gap-3">
        {siteConfig.navItems.map((item, index) => {
          if (!item.show || (item.show && item.show.includes(userLevel))) {
            return (
              <li key={index}>
                {item.sub ? (
                  <div
                    className={`group flex cursor-pointer flex-col gap-3 text-base ${
                      activeMain(item.href) === true ? "open" : ""
                    }`}
                    onClick={(e) => handleClick(e)}
                  >
                    <div
                      className={`${
                        activeMain(item.href) === true
                          ? "bg-[#f2f2f2] text-[#444]"
                          : "text-[#888]"
                      } py-3 px-3 flex items-center rounded-md`}
                    >
                      <span
                        className={`${
                          activeMain(item.href) === true
                            ? "text-[#444]"
                            : "text-[#888]"
                        } font-medium w-6`}
                      >
                        {item.icon}
                      </span>
                      <p
                        className={`leading-1 ml-3 flex ${
                          activeMain(item.href) === true
                            ? "font-bold dark:text-white"
                            : "font-medium "
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                    <div className="hidden flex-col px-12 gap-2 group-[.open]:flex">
                      {item.sub.map((sub, index) => {
                        if (sub.show && sub.show.includes(userLevel)) {
                          return (
                            <Link
                              href={sub.href}
                              key={index}
                              className={`${
                                activeRoute(sub.href) === true
                                  ? "text-[#444] font-bold"
                                  : "text-[#888]"
                              }`}
                            >
                              <div>{sub.label}</div>
                            </Link>
                          );
                        }
                      })}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    key={item.href}
                    className="w-full block"
                  >
                    <div
                      className={`${
                        activeRoute(item.href) === true
                          ? "bg-[#f2f2f2] text-[#444]"
                          : "text-[#888]"
                      } py-3 flex cursor-pointer items-center px-3 text-base rounded-md`}
                    >
                      <span
                        className={`${
                          activeRoute(item.href) === true
                            ? "text-[#444]"
                            : "text-[#888]"
                        } font-medium w-6`}
                      >
                        {item.icon}
                      </span>
                      <p
                        className={`leading-1 ml-3 flex ${
                          activeRoute(item.href) === true
                            ? "font-bold dark:text-white"
                            : "font-medium "
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  </Link>
                )}
              </li>
            );
          }
        })}
      </ul>
      {/* Nav item end */}

      <div className="mb-5 mt-5 h-px bg-gray-300 dark:bg-white/30" />
    </div>
  );
}
