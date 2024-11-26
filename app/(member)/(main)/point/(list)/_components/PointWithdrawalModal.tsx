"use client";

import { useState } from "react";
import { GrClose } from "react-icons/gr";

import { User } from "@/stores/auth.store";
import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function PointWithdrawalModal({ user }: { user: User }) {
  const [point, setPoint] = useState("");
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  const handlePointClick = (e: any) => {
    const point = e.target.dataset.point;

    if (point) setPoint(point);
  };

  const handleWithdrawalClick = () => {
    if (!point) {
      alert("출금금액을 선택해주세요.");

      return false;
    }

    //console.log(point);
  };

  // 모달 닫기 클릭
  const handleModalCloseClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  return (
    <div className="w-[400px] max-h-[80vh] overflow-y-scroll scroll-bar px-1">
      {/* 출금 금액 */}
      <div className="">
        <div className="text-[#333] font-semibold text-lg flex justify-between items-center">
          <div>
            포인트 출금 <span className="text-red-600">*</span>
          </div>
          <div
            className="cursor-pointer text-xl"
            role="presentation"
            onClick={handleModalCloseClick}
          >
            <GrClose />
          </div>
        </div>
        <input
          className="w-full h-16 border border-[#c9c9c9] rounded-md mt-3 mb-5 px-5 text-[16px] text-[#333] placeholder:text-[#aaa] disabled:bg-white cursor-not-allowed"
          defaultValue={point ? Number(point).toLocaleString() : ""}
          disabled={true}
          placeholder="최소 출금 포인트: 50,000 P"
          type="text"
        />
        <div className="pb-5 border-b border-[#c9c9c9]">
          <ol
            className="grid grid-cols-4 gap-3 *:w-full *:bg-[#f5f5f5] *:rounded-md *:text-center *:py-[8px] *:cursor-pointer"
            role="presentation"
            onClick={(e) => handlePointClick(e)}
          >
            <li data-point="50000">+5만 P</li>
            <li data-point="100000">+10만 P</li>
            <li data-point="300000">+30만 P</li>
            <li data-point="500000">+50만 P</li>
            <li data-point="1000000">+100만 P</li>
            <li data-point="1500000">+150만 P</li>
            <li data-point="2000000">+200만 P</li>
          </ol>
        </div>
        <div className="pt-5 pb-8 border-b border-[#c9c9c9]">
          <div className="bg-[#e9edf9] border border-[#c9cfe1] rounded-lg p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div>현재 보유 포인트</div>
              <div className="font-bold">{user.point.toLocaleString()} P</div>
            </div>
            <div className="flex justify-between items-center">
              <div>출금 포인트</div>
              <div className="text-2xl font-bold text-[#6a78a3]">
                {point ? `+ ${Number(point).toLocaleString()}P` : "-"}
              </div>
            </div>
          </div>
          <div className="flex justify-between px-5 pt-4">
            <div>출금 후 내 포인트</div>
            <div className="font-bold">
              {(user.point - Number(point)).toLocaleString()}P
            </div>
          </div>
        </div>
      </div>
      {/* 출금신청 버튼 */}
      <div
        className="mt-5 w-full h-14 bg-navy-800 hover:bg-navy-900 text-white text-lg text-center content-center rounded-lg cursor-pointer"
        role="presentation"
        onClick={handleWithdrawalClick}
      >
        출금신청
      </div>
      {/* 이용 상세 안내 */}
      <div className="bg-[#f5f5f5] mt-5 py-4 px-5 rounded-lg">
        <div className="text-[13px] font-semibold mb-3">이용 상세 안내</div>
        <ol className="flex flex-col gap-1 *:text-[12px] *:pl-5 *:break-keep *:relative *:before:content-[''] *:before:block *:before:absolute *:before:left-[2px] *:before:top-[8px] *:before:w-[4px] *:before:h-[4px] *:before:bg-[#333] *:before:rounded-md">
          <li>포인트 출금은 최소 5만 포인트부터 가능합니다.</li>
          <li>포인트 출금은 1만 포인트 단위로 이루어집니다.</li>
        </ol>
      </div>
    </div>
  );
}
