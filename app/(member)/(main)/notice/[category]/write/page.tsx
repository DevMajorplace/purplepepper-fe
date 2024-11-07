import NoticeForm from "./_components/NoticeForm";

import { ModalProvider } from "@/contexts/ModalContext";

export default function NoticeWrite() {
  return (
    <div>
      <div className="text-xl font-bold pb-3">공지사항 작성</div>
      <ModalProvider>
        <NoticeForm />
      </ModalProvider>
    </div>
  );
}
