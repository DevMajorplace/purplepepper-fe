import Card from "@/components/card";

export default function MissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Card className="min-h-[87vh]">{children}</Card>;
}
