import Card from "@/components/card";

export default function NoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Card className="min-h-[87vh] gap-5">{children}</Card>;
}
