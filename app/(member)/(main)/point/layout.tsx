import { ModalProvider } from "@/contexts/ModalContext";

export default function PointLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalProvider>{children}</ModalProvider>;
}
