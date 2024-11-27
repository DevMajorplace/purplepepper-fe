import { Suspense } from "react";

import Card from "@/components/card";

export default function NoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="min-h-[87vh] gap-5">
      <Suspense fallback={<p>Loading List...</p>}>{children}</Suspense>
    </Card>
  );
}
