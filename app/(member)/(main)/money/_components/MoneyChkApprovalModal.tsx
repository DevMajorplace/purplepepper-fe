import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function MoneyChkApprovalModal({ info }: MoneyChkModalProps) {
  const [state, setState] = useState(false);
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();
  const router = useRouter();
  const path = usePathname();

  // 취소 클릭시
  const handleCancelClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  // 승인 클릭시
  const handleApprovalClick = () => {
    setState(true);
  };

  // 확인 클릭시
  const handleOkayClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
    router.push(path);
  };

  return (
    <div className="min-w-[420px]">
      <div className="text-[20px] font-bold">요청 일괄승인</div>
      <p className="text-[#000]/60 mt-1 mb-6">
        {state
          ? `${info.length}건의 요청을 승인했습니다.`
          : `${info.length}건의 요청을 승인합니까?`}
      </p>
      <div className="flex justify-between *:px-4 *:py-2 *:rounded">
        {state ? (
          <button
            className="w-full bg-[#333] text-white hover:bg-[#111]"
            onClick={handleOkayClick}
          >
            확인
          </button>
        ) : (
          <>
            <button
              className="border border-[#ccc]"
              onClick={handleCancelClick}
            >
              취소
            </button>
            <button
              className="bg-[#333] text-white hover:bg-[#111]"
              onClick={handleApprovalClick}
            >
              승인
            </button>
          </>
        )}
      </div>
    </div>
  );
}
