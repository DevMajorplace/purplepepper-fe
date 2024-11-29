import { useRouter } from "next/navigation";
import { useState } from "react";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import instance from "@/api/axios";

export default function WaitingRefusalModal({
  info,
}: WaitingRefusalModalProps) {
  const [state, setState] = useState(false);
  const [reason, setReason] = useState("");
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();
  const router = useRouter();

  // 취소 클릭시
  const handleCancelClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  // 거절 클릭시
  const handleApprovalClick = async () => {
    try {
      await instance.patch(`/admin/decline`, {
        user_ids: [info.id],
        rejection_reason: reason,
      });

      setState(true);
    } catch (error: any) {
      //console.log(error);
      alert(error.response.data.message);
    }
  };

  // 확인 클릭시
  const handleOkayClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
    router.refresh();
  };

  return (
    <div className="min-w-[420px]">
      <div className="text-[20px] font-bold">가입 거절</div>
      <p className="text-[#000]/60 mt-1 mb-6">
        {state ? (
          <>
            <div>
              {`${info.company}, ${info.name}, ${info.recommendId}`}의 가입을
              거절 했습니다.
            </div>
            <div>사유 : {reason ? reason : "-"}</div>
          </>
        ) : (
          `${info.company}, ${info.name}, ${info.recommendId}의 가입을 거절 하시겠습니까?`
        )}
      </p>
      {!state && (
        <div className="mb-6 flex flex-col">
          <label className="mb-1" htmlFor="reason">
            거절 사유 입력
          </label>
          <textarea
            className="border border-[#ccc] rounded p-3"
            id="reason"
            name="reason"
            placeholder="거절 사유를 입력해주세요."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      )}
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
              거절
            </button>
          </>
        )}
      </div>
    </div>
  );
}
