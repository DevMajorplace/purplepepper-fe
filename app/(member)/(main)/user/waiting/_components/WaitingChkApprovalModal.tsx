import { useState } from "react";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import instance from "@/api/axios";

export default function WaitingChkApprovalModal({
  info,
  setData,
  setTotal,
  setTotalPages,
}: WaitingChkApprovalModalProps) {
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
      await instance.patch(`/admin/approve`, { user_ids: info });

      setState(true);
    } catch (error: any) {
      //console.log(error);
      alert(error.response.data.message);
    }
  };

  // 확인 클릭시
  const handleOkayClick = async () => {
    try {
      const res = await instance.get(
        // eslint-disable-next-line prettier/prettier
        `/admin/status?page=1&pageSize=15&status=pending`
      );

      setData(
        res.data.data.map(
          (item: WaitingData) => {
            return {
              id: item.user_id,
              company: item.company_name,
              name: item.manager_name,
              phone: item.manager_contact,
              recommendId: item.parent_id,
              createdAt: item.created_at,
              certificate: item.business_registration,
            };
            // eslint-disable-next-line prettier/prettier
          }
          // eslint-disable-next-line prettier/prettier
        )
      );

      // 총 인원
      setTotal(res.data.totalItems);
      // 총 페이지 수
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      //console.log(error);
      alert(error.response.data.message);
    }
    setModalOpen(false);
    setModalContents(<></>);
  };

  return (
    <div className="min-w-[420px]">
      <div className="text-[20px] font-bold">가입 일괄승인</div>
      <p className="text-[#000]/60 mt-1 mb-6">
        {state
          ? `${info.length}건의 가입을 승인했습니다.`
          : `${info.length}건의 가입을 승인합니까?`}
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
