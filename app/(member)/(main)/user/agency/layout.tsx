import { Suspense } from "react";

export default function UserAgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
