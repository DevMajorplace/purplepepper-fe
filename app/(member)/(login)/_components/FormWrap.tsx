import Card from "@/components/card";

export default function FormWrap({
  title = "",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center pt-6 pb-10 px-7">
      <div className="text-[24px] pb-5 font-bold">{title}</div>
      <Card className="w-full p-6 pb-8 sm:w-[420px]">{children}</Card>
    </div>
  );
}
