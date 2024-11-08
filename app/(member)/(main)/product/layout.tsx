import { ModalProvider } from "@/contexts/ModalContext";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalProvider>{children}</ModalProvider>;
}
