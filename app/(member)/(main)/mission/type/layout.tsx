"use client";

import { ModalProvider } from "@/contexts/ModalContext";

export default function MissionTypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalProvider>{children}</ModalProvider>;
}
