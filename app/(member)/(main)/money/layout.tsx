"use client";

import { ModalProvider } from "@/contexts/ModalContext";

export default function MoneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalProvider>{children}</ModalProvider>;
}
