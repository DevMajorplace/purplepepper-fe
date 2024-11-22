import { Suspense } from "react";

import Card from "@/components/card";

export default function MissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <Card className="min-h-[87vh]">{children}</Card>
    </Suspense>
  );
}
