import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function MoneyChkApprovalModal({
  type,
  info,
}: {
  type: string;
  info: any;
}) {
  const [state, setState] = useState(false);
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();
  const router = useRouter();
  const params = useParams();
  const { category } = params;

  // 취소 클릭시
  const handleCancelClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  // 확인 클릭시
  const handleConfirmClick = () => {
    setState(true);
  };

  // 확인 클릭시
  const handleOkayClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
    router.push(`/notice/${category}`);
  };

  return (
    <div className="min-w-[360px]">
      <div className="text-[20px] font-bold">
        공지사항 {type === "delete" ? "삭제" : "수정"}
      </div>
      <p className="text-[#000]/60 mt-1 mb-6">
        {state
          ? `${info.title}을 ${type === "delete" ? "삭제" : "수정"}했습니다.`
          : `${info.title}을 ${type === "delete" ? "삭제" : "수정"} 하시겠습니까?`}
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
              onClick={handleConfirmClick}
            >
              {type === "delete" ? "삭제" : "수정"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
