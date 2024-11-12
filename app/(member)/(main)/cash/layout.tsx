import { ModalProvider } from "@/contexts/ModalContext";

export default function CashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalProvider>{children}</ModalProvider>;
}
