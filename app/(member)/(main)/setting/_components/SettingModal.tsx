import { useRouter } from "next/navigation";
import { useState } from "react";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import instance from "@/api/axios";

export default function SettingModal({
  info,
  type,
}: {
  info: any;
  type: string;
}) {
  const [state, setState] = useState(false);
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();
  const router = useRouter();

  // 취소 클릭시
  const handleCancelClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  // 확인 클릭시
  const handleConfirmClick = async () => {
    try {
      await instance.patch(type === "agency" ? "" : "/users/my-info", {
        password: info.password,
        manager_name: info.name,
        manager_contact: info.phone,
        account_bank: info.account.bank,
        account_number: info.account.accountNumber,
        account_holder: info.account.depositor,
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
    <div className="min-w-[360px]">
      <div className="text-[20px] font-bold">회원 정보 수정</div>
      <p className="text-[#000]/60 mt-1 mb-6">
        {state ? `회원정보를 수정 했습니다.` : `회원정보를 수정 하시겠습니까?`}
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
              수정
            </button>
          </>
        )}
      </div>
    </div>
  );
}
