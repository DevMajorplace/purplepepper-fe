"use client";

import { useParams, usePathname } from "next/navigation";

import UserDetailTab from "../../_components/UserDetailTab";

import Card from "@/components/card";
import { IdProvider } from "@/contexts/IdContext";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const id = Number(params.id);

  const TABS = [
    {
      name: "회원정보",
      link: `/user/agency/${id}`,
      on: pathname === `/user/agency/${id}`,
    },
    {
      name: "매출 및 광고주",
      link: `/user/agency/${id}/sales`,
      on: pathname === `/user/agency/${id}/sales`,
    },
    {
      name: "포인트 내역",
      link: `/user/agency/${id}/point/earn`,
      on: pathname.includes(`/user/agency/${id}/point`),
    },
    {
      name: "조직도",
      link: `/user/agency/${id}/organization`,
      on: pathname === `/user/agency/${id}/organization`,
    },
  ];

  return (
    <Card className="min-h-[87vh] gap-5">
      <UserDetailTab tabs={TABS} />
      <IdProvider id={id}>{children}</IdProvider>
    </Card>
  );
}
