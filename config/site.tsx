export type SiteConfig = typeof siteConfig;
import { HiMiniHome } from "react-icons/hi2";
import { GoQuestion } from "react-icons/go";
import { PiDatabase, PiCurrencyCircleDollar, PiWarning } from "react-icons/pi";
import { LuUsers, LuGoal, LuTv } from "react-icons/lu";
import { GrCubes } from "react-icons/gr";
import { AiOutlineSetting } from "react-icons/ai";
//import { FiPlus } from "react-icons/fi";
//import { FiLogOut } from "react-icons/fi";

export const categories = [
  {
    name: "카테고리1",
    id: "category1",
  },
  {
    name: "카테고리2",
    id: "category2",
  },
  {
    name: "카테고리3",
    id: "category3",
  },
  {
    name: "카테고리4",
    id: "category4",
  },
  {
    name: "카테고리5",
    id: "category5",
  },
];

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
      show: ["admin", "agency"],
      sub: [
        {
          label: "총판 관리",
          href: "/user/agency",
          show: ["admin"],
        },
        {
          label: "광고주 관리",
          href: "/user/client",
          show: ["admin", "agency"],
        },
        {
          label: "가입 대기자 관리",
          href: "/user/waiting",
          show: ["admin"],
        },
      ],
    },
    {
      label: "미션 관리",
      href: "/mission",
      icon: <LuGoal className="w-full h-full" />,
      show: ["admin", "client"],
      sub: [
        {
          label: "미션 목록",
          href: "/mission/list",
          show: ["admin"],
        },
        {
          label: "미션 통계",
          href: "/mission/statistics",
          show: ["admin", "client"],
        },
        {
          label: "미션 참여자 내역",
          href: "/mission/participant",
          show: ["admin", "client"],
        },
        {
          label: "미션 분류 관리",
          href: "/mission/type",
          show: ["admin"],
        },
      ],
    },
    {
      label: "상품 관리",
      href: "/product",
      icon: <GrCubes className="w-full h-full" />,
      show: ["admin"],
      sub: [
        {
          label: "상품 목록",
          href: "/product/list",
          show: ["admin"],
        },
        {
          label: "브라우저 유입 경로 목록",
          href: "/product/browser-inflow",
          show: ["admin"],
        },
        {
          label: "템플릿 목록",
          href: "/product/template",
          show: ["admin"],
        },
      ],
    },
    {
      label: "미션 CS 관리",
      href: "/missionCS",
      icon: <PiWarning className="w-full h-full" />,
      show: ["admin"],
      sub: [
        {
          label: "미션 CS 목록",
          href: "/missionCS",
          show: ["admin"],
        },
      ],
    },
    {
      label: "입출금 관리",
      href: "/money",
      icon: <PiCurrencyCircleDollar className="w-full h-full" />,
      show: ["admin"],
      sub: [
        {
          label: "캐시 관리",
          href: "/money/cash",
          show: ["admin"],
        },
        {
          label: "포인트 관리",
          href: "/money/point",
          show: ["admin"],
        },
      ],
    },
    {
      label: "매체사 관리",
      href: "/affiliate",
      icon: <LuTv className="w-full h-full" />,
      show: ["admin"],
      sub: [
        {
          label: "매체사 목록",
          href: "/affiliate",
          show: ["admin"],
        },
      ],
    },
    {
      label: "캐시 관리",
      href: "/cash",
      icon: <PiDatabase className="w-full h-full" />,
      show: ["client"],
      sub: [
        {
          label: "이용 내역",
          href: "/cash/usage",
          show: ["client"],
        },
        {
          label: "충전 내역",
          href: "/cash/charge",
          show: ["client"],
        },
      ],
    },
    {
      label: "포인트 관리",
      href: "/point",
      icon: <PiDatabase className="w-full h-full" />,
      show: ["agency", "client"],
      sub: [
        {
          label: "적립 내역",
          href: "/point/earn",
          show: ["agency", "client"],
        },
        {
          label: "출금 내역",
          href: "/point/withdrawal",
          show: ["agency", "client"],
        },
      ],
    },
    {
      label: "공지사항",
      href: `/notice`,
      icon: <GoQuestion className="w-full h-full" />,
    },
    {
      label: "내 정보",
      href: "/setting",
      icon: <AiOutlineSetting className="w-full h-full" />,
      show: ["agency", "client"],
      sub: [
        {
          label: "회원 정보",
          href: "/setting",
          show: ["agency", "client"],
        },
        {
          label: "조직도",
          href: "/setting/organization",
          show: ["agency", "client"],
        },
      ],
    },
  ],
  navContent: [
    {
      label: "로그인",
      href: "/login",
    },
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
      label: "템플릿 목록",
      href: "/product/template",
    },
    {
      label: "브라우저 유입 경로 목록",
      href: "/product/browser-inflow",
    },
    {
      label: "상품 목록",
      href: "/product/list",
    },
    {
      label: "미션별 포인트",
      href: "/mission-point",
    },
    {
      label: "미션 CS 관리",
      href: "/missionCS",
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
      label: "이용 내역",
      href: "/cash/usage",
    },
    {
      label: "충전 내역",
      href: "/cash/charge",
    },
    {
      label: "출금 내역",
      href: "/point/withdrawal",
    },
    {
      label: "적립 내역",
      href: "/point/earn",
    },
    {
      label: "공지사항",
      href: "/notice",
    },
    {
      label: "조직도",
      href: "/setting/organization",
    },
    {
      label: "회원 정보",
      href: "/setting",
    },
  ],
};
