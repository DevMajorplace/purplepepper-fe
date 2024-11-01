import Card from "@/components/card";

export default function MissionCard({
  title,
  children,
}: {
  title: String;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <div className="text-lg font-bold">{title}</div>
      {children}
    </Card>
  );
}
