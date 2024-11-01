import { useRouter } from "next/navigation";
import { useState } from "react";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function WaitingApprovalModal({
  info,
}: WaitingApprovalModalProps) {
  const [state, setState] = useState(false);
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();
  const router = useRouter();

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
    router.push(`/user/waiting`);
  };

  return (
    <div className="min-w-[420px]">
      <div className="text-[20px] font-bold">가입 승인</div>
      <p className="text-[#000]/60 mt-1 mb-6">
        {state
          ? `${info.company}, ${info.name}, ${info.recommendId}의 가입을 승인했습니다.`
          : `${info.company}, ${info.name}, ${info.recommendId}의 가입을 승인합니까?`}
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
