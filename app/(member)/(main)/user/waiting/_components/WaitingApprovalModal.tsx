import { useState } from "react";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import instance from "@/api/axios";

export default function WaitingApprovalModal({
  info,
  data,
  setData,
}: WaitingApprovalModalProps) {
  const [state, setState] = useState(false);
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  // 취소 클릭시
  const handleCancelClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  // 승인 클릭시
  const handleApprovalClick = async () => {
    try {
      await instance.patch(`/admin/approve`, { user_ids: [info.id] });

      setState(true);
    } catch (error: any) {
      //console.log(error);
      alert(error.response.data.message);
    }
  };

  // 확인 클릭시
  const handleOkayClick = () => {
    const newData = data.filter((item) => {
      return item.id != info.id;
    });

    setData(newData);
    setModalOpen(false);
    setModalContents(<></>);
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
