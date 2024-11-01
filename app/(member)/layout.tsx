"use client";

import useAuth from "@/hooks/useAuth";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 로그인 확인
  useAuth();

  return <div>{children}</div>;
}
