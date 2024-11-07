import NoticeForm from "./_components/NoticeForm";

import Card from "@/components/card";

export default function NoticeWrite() {
  return (
    <Card className="min-h-[87vh] gap-5">
      <div className="text-xl font-bold pb-3">공지사항</div>
      <NoticeForm />
    </Card>
  );
}
