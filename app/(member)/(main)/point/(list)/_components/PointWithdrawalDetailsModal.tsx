"use client";

import { useEffect, useState } from "react";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import { FaExclamationCircle } from "react-icons/fa";

const DEFAULT = {
  amount: 10000,
  account: {
    bank: "KEB 하나은행",
    accountNumber: "111-11111111-111111",
    depositor: "홍길동",
  },
  reason: "",
};

export default function PointWithdrawalDetailsModal({ idx }: { idx: string }) {
  const [data, setDate] = useState(DEFAULT);
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  useEffect(() => {}, [idx]);

  // 나가기 클릭시
  const handleCloseClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  return (
    <div className="flex flex-col gap-5 w-[480px]">
      <div className="text-[24px] font-bold text-center">출금요청 내역</div>
      <div className="bg-[#e9edf9] border border-[#c9cfe1] rounded-lg p-5 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div>출금 액수</div>
          <div className="font-bold text-[18px]">
            {data.amount.toLocaleString()} P
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>입금 받을 계좌 정보</div>
          <div className="font-bold">
            {`${data.account.bank} / ${data.account.accountNumber} / ${data.account.depositor}`}
          </div>
        </div>
        {data.reason && (
          <div className="flex justify-between items-center">
            <div>거절 사유</div>
            <div className="font-bold">{data.reason}</div>
          </div>
        )}
      </div>
      <div
        className="mt-5 w-full h-12 border border-[#000]/40 text-[#000] text-center content-center rounded-lg cursor-pointer"
        role="presentation"
        onClick={handleCloseClick}
      >
        나가기
      </div>
      <div className="flex flex-col gap-3 pb-2">
        <div className="bg-[#e9edf9] flex gap-3 items-center p-4 text-[13px]">
          <FaExclamationCircle className="text-[20px] text-[#4f66af]" />{" "}
          ‘주식회사 퍼플페퍼’ 이름으로 입금 될 예정입니다.
        </div>
        <div className="bg-[#e9edf9] flex gap-3 items-center p-4 text-[13px]">
          <FaExclamationCircle className="text-[20px] text-[#4f66af]" />{" "}
          출금요청 후 6시간 내에 처리되지 않으면 자동 거절됩니다.
        </div>
      </div>
    </div>
  );
}
