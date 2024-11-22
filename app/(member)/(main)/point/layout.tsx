import { Suspense } from "react";

import { ModalProvider } from "@/contexts/ModalContext";

export default function PointLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <ModalProvider>{children}</ModalProvider>
    </Suspense>
  );
}
