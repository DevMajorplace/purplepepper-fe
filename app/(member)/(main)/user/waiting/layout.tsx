"use client";

import { ModalProvider } from "@/contexts/ModalContext";

export default function WaitingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalProvider>{children}</ModalProvider>;
}
