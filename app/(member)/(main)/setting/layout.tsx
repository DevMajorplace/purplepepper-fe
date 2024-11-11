"use client";

import { usePathname } from "next/navigation";

import UserDetailTab from "../user/_components/UserDetailTab";

import Card from "@/components/card";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const TABS = [
    {
      name: "회원정보",
      link: `/setting`,
      on: pathname === `/setting`,
    },
    {
      name: "조직도",
      link: `/setting/organization`,
      on: pathname === `/setting/organization`,
    },
  ];

  return (
    <Card className="min-h-[87vh] gap-5">
      <UserDetailTab tabs={TABS} />
      {children}
    </Card>
  );
}
