export type SiteConfig = typeof siteConfig;
import { HiMiniHome } from "react-icons/hi2";
import { GoQuestion } from "react-icons/go";
import { PiDatabase, PiCurrencyCircleDollar } from "react-icons/pi";
import { LuUsers, LuGoal, LuTv } from "react-icons/lu";
//import { FiPlus } from "react-icons/fi";
//import { FiLogOut } from "react-icons/fi";

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "대시보드",
      href: "/dashboard",
      icon: <HiMiniHome className="w-full h-full" />,
    },
    {
      label: "사용자 관리",
      href: "/user",
      icon: <LuUsers className="w-full h-full" />,
      show: [10, 3],
      sub: [
        {
          label: "총판 관리",
          href: "/user/agency",
          show: [10],
        },
        {
          label: "광고주 관리",
          href: "/user/client",
          show: [10, 3],
        },
        {
          label: "가입 대기자 관리",
          href: "/user/waiting",
          show: [10],
        },
      ],
    },
    {
      label: "미션 관리",
      href: "/mission",
      icon: <LuGoal className="w-full h-full" />,
      show: [10],
      sub: [
        {
          label: "미션 목록",
          href: "/mission/list",
          show: [10],
        },
        {
          label: "미션 통계",
          href: "/mission/statistics",
          show: [10],
        },
        {
          label: "미션 참여자 내역",
          href: "/mission/participant",
          show: [10],
        },
        {
          label: "미션 분류 관리",
          href: "/mission/type",
          show: [10],
        },
      ],
    },
    {
      label: "입출금 관리",
      href: "/money",
      icon: <PiCurrencyCircleDollar className="w-full h-full" />,
      show: [10],
      sub: [
        {
          label: "캐시 관리",
          href: "/money/cash",
          show: [10],
        },
        {
          label: "포인트 관리",
          href: "/money/point",
          show: [10],
        },
      ],
    },
    {
      label: "매체사 관리",
      href: "/affiliate",
      icon: <LuTv className="w-full h-full" />,
      show: [10],
      sub: [
        {
          label: "매체사 목록",
          href: "/affiliate",
          show: [10],
        },
      ],
    },
    {
      label: "포인트 관리",
      href: "/point",
      icon: <PiDatabase className="w-full h-full" />,
      show: [2],
    },
    {
      label: "공지사항",
      href: "/notice",
      icon: <GoQuestion className="w-full h-full" />,
    },
  ],
  navContent: [
    {
      label: "홈",
      href: "/main",
    },
    {
      label: "대시보드",
      href: "/dashboard",
    },
    {
      label: "총판 추가하기",
      href: "/user/agency/add",
    },
    {
      label: "총판 목록",
      href: "/user/agency",
    },
    {
      label: "광고주 목록",
      href: "/user/client",
    },
    {
      label: "가입 대기자 목록",
      href: "/user/waiting",
    },
    {
      label: "미션 분류 관리",
      href: "/mission/type",
    },
    {
      label: "미션 참여자 내역",
      href: "/mission/participant",
    },
    {
      label: "미션 통계",
      href: "/mission/statistics",
    },
    {
      label: "미션 목록",
      href: "/mission/list",
    },
    {
      label: "미션별 포인트",
      href: "/mission-point",
    },
    {
      label: "캐시 관리",
      href: "/money/cash",
    },
    {
      label: "포인트 관리",
      href: "/money/point",
    },
    {
      label: "매체사 관리",
      href: "/affiliate",
    },
    {
      label: "포인트 관리",
      href: "/point",
    },
    {
      label: "포인트 충전",
      href: "/point/charge",
    },
    {
      label: "자주 묻는 질문",
      href: "/faq",
    },
    {
      label: "공지사항",
      href: "/notice",
    },
  ],
};
