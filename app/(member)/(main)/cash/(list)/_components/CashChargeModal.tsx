"use client";

import { useState } from "react";
import { GrClose } from "react-icons/gr";

import { User } from "@/stores/auth.store";
import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function CashChargeModal({ user }: { user: User }) {
  const [point, setPoint] = useState("");
  const [name, setName] = useState(user.name);
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  const handlePointClick = (e: any) => {
    const point = e.target.dataset.point;

    if (point) setPoint(point);
  };

  const handleChargeClick = () => {
    if (!point) {
      alert("충전금액을 선택해주세요.");

      return false;
    }

    //console.log(point);
  };

  const handleNameChange = (e: any) => {
    const value = e.target.value;

    setName(value);
  };

  // 모달 닫기 클릭
  const handleModalCloseClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  return (
    <div className="w-[400px] max-h-[80vh] overflow-y-scroll scroll-bar px-1">
      {/* 충전 금액 */}
      <div className="">
        <div className="text-[#333] font-semibold text-lg flex justify-between items-center">
          <div>
            캐시 충전 <span className="text-red-600">*</span>
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
          placeholder="최소 충전 캐시: 50,000 P"
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
              <div>현재 보유 캐시</div>
              <div className="font-bold">{user.point.toLocaleString()} P</div>
            </div>
            <div className="flex justify-between items-center">
              <div>충전 캐시</div>
              <div className="text-2xl font-bold text-[#6a78a3]">
                {point ? `+ ${Number(point).toLocaleString()}P` : "-"}
              </div>
            </div>
          </div>
          <div className="flex justify-between px-5 pt-4">
            <div>충전 후 내 캐시</div>
            <div className="font-bold">
              {(user.point - Number(point)).toLocaleString()}P
            </div>
          </div>
        </div>
      </div>
      {/* 입금자명 */}
      <div className="pt-8">
        <div className="text-[#333] font-semibold">
          입금자명 <span className="text-red-600">*</span>
        </div>
        <input
          className="w-full h-12 border border-[#c9c9c9] rounded-md mt-3 mb-5 px-5 text-[#333] focus:outline-none"
          defaultValue={name}
          type="text"
          onChange={(e) => handleNameChange(e)}
        />
      </div>
      {/* 충전신청 버튼 */}
      <div
        className="mt-5 w-full h-14 bg-navy-800 hover:bg-navy-900 text-white text-lg text-center content-center rounded-lg cursor-pointer"
        role="presentation"
        onClick={handleChargeClick}
      >
        충전신청
      </div>
      {/* 이용 상세 안내 */}
      <div className="bg-[#f5f5f5] mt-5 py-4 px-5 rounded-lg">
        <div className="text-[13px] font-semibold mb-3">이용 상세 안내</div>
        <ol className="flex flex-col gap-1 *:text-[12px] *:pl-5 *:break-keep *:relative *:before:content-[''] *:before:block *:before:absolute *:before:left-[2px] *:before:top-[8px] *:before:w-[4px] *:before:h-[4px] *:before:bg-[#333] *:before:rounded-md">
          <li>충전 캐시는 1회 최대 1000만 원까지 충전할 수 있습니다.</li>
          <li>
            신용카드 결제 시 각 카드사의 결제한도가 적용되며, 결제수단 선택 후
            안내 표를 통 해 확인하실 수 있습니다.
          </li>
          <li>충전 캐시의 유효기간은 충전일로부터 5년입니다.</li>
          <li>
            서비스 구매 시 유효기간 만료일이 가까운 순서대로 사용되나, 보너스
            적립 캐시의 경우 충전 캐시가 모두 소진된 이후 사용됩니다.
          </li>
          <li>
            충전 캐시는 상품/서비스 구매를 위해 사전에 일정 금액을 예치하는
            것이므로 세금 계산서 발행 대상이 아닙니다.
          </li>
          <li>
            충전 캐시를 사용하여 상품/서비스를 구매하실 때 결제 금액에 대한
            세금계산서 신 청이 가능합니다. (개인전문가는 발행 불가)
          </li>
          <li>
            충전 캐시의 영수증(신용카드 전표/현금영수증)은 개인 소득공제용으로만
            사용하 실 수 있습니다.
          </li>
          <li>
            캐시 충전시 발행 되는 현금영수증과 카드 전표는 지출 증빙 용도로만
            사용할 수 있 으며, 매입세액공제가 불가합니다. (충전 캐시로 상품
            구매시에만 매입세액공제가 가능한 세금계산서 발급)
          </li>
          <li>충전 캐시는 전액 환불만 가능합니다. (부분 환불 불가)</li>
        </ol>
      </div>
    </div>
  );
}
