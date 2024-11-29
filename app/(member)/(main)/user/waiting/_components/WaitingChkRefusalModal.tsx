import { useState } from "react";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import instance from "@/api/axios";

export default function WaitingChkRefusalModal({
  info,
  data,
  setData,
}: WaitingChkRefusalModalProps) {
  const [state, setState] = useState(false);
  const [reason, setReason] = useState("");
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  // 취소 클릭시
  const handleCancelClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  // 거절 클릭시
  const handleApprovalClick = async () => {
    try {
      await instance.patch(`/admin/decline`, {
        user_ids: info,
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
    const newData = data.filter((item) => {
      return !info.includes(item.id);
    });

    setData(newData);
    setModalOpen(false);
    setModalContents(<></>);
  };

  return (
    <div className="min-w-[420px]">
      <div className="text-[20px] font-bold">가입 일괄거절</div>
      <p className="text-[#000]/60 mt-1 mb-6">
        {state ? (
          <>
            <div>{info.length}건의 요청을 거절했습니다.</div>
            <div>사유 : {reason ? reason : "-"}</div>
          </>
        ) : (
          `${info.length}건의 요청을 거절합니까?`
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
          <p className="text-[12px] text-[#000]/60">
            선택된 모든 요청건에 대해 같은 사유가 입력됩니다.
          </p>
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
