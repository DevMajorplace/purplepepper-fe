"use client";

import { useParams, usePathname } from "next/navigation";

import UserDetailTab from "../../_components/UserDetailTab";

import Card from "@/components/card";
import { IdProvider } from "@/contexts/IdContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const id = params.id;

  const TABS = [
    {
      name: "회원정보",
      link: `/user/client/${id}`,
      on: pathname === `/user/client/${id}`,
      admin: true,
    },
    {
      name: "캐시 내역",
      link: `/user/client/${id}/cash/usage`,
      on: pathname.includes(`/user/client/${id}/cash`),
    },
    {
      name: "포인트 내역",
      link: `/user/client/${id}/point/earn`,
      on: pathname.includes(`/user/client/${id}/point`),
    },
    {
      name: "미션 내역",
      link: `/user/client/${id}/mission/list`,
      on: pathname.includes(`/user/client/${id}/mission`),
    },
    {
      name: "조직도",
      link: `/user/client/${id}/organization`,
      on: pathname === `/user/client/${id}/organization`,
    },
  ];

  return (
    <Card className="min-h-[87vh] gap-5">
      <UserDetailTab tabs={TABS} />
      <IdProvider id={id as string}>{children}</IdProvider>
    </Card>
  );
}
