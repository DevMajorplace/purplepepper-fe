"use client";

import { useParams, usePathname } from "next/navigation";

import UserDetailTab from "../../user/_components/UserDetailTab";

import Card from "@/components/card";
import { AffiliateProvider } from "@/contexts/AffiliateContext";

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
      name: "매체사 정보",
      link: `/affiliate/${id}`,
      on: pathname === `/affiliate/${id}`,
    },
    {
      name: "미션 목록",
      link: `/affiliate/${id}/mission`,
      on: pathname.includes(`/affiliate/${id}/mission`),
    },
    {
      name: "미션 통계",
      link: `/affiliate/${id}/statistics`,
      on: pathname.includes(`/affiliate/${id}/statistics`),
    },
    {
      name: "미션 참여내역",
      link: `/affiliate/${id}/participant`,
      on: pathname.includes(`/affiliate/${id}/participant`),
    },
  ];

  return (
    <Card className="min-h-[87vh] gap-5">
      <UserDetailTab tabs={TABS} />
      <AffiliateProvider idx={id as string}>{children}</AffiliateProvider>
    </Card>
  );
}
