import CashChargeDetailsModal from "../cash/(list)/_components/CashChargeDetailsModal";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function CashListItem({
  idx,
  type,
  content,
  detail,
  point,
  createdAt,
  listType,
}: PointListItemProps) {
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  // 타이틀 클릭시 - 충전 요청 내역
  const handleTitleClick = () => {
    if (listType) {
      setModalOpen(true);
      setModalContents(<CashChargeDetailsModal idx={idx} />);
    }
  };

  // 타입별 컬러
  const TypeColor = (type: string) => {
    switch (type) {
      case "환불":
        return "green";
      case "승인":
        return "green";
      case "충전":
        return "green";
      case "대기":
        return "gray";
      default:
        return "red";
    }
  };

  return (
    <div className="flex justify-between px-8 py-4 border border-[#e1e1e1] rounded-lg">
      <div className="flex gap-5">
        {type && (
          <div className="flex items-center">
            <div
              className={`px-4 py-[10px] rounded-md ${TypeColor(type) === "green" ? "bg-[#f0fdf4] text-[#16a34a]" : TypeColor(type) === "gray" ? "bg-gray-400/20 text-gray-700" : "bg-[#fef2f2] text-[#ef4444]"}`}
            >
              {type}
            </div>
          </div>
        )}
        <div>
          <div>{createdAt.toLocaleString()}</div>
          <div
            className={`text-[18px] inline-flex font-semibold mb-1 mt-2 ${listType && "cursor-pointer"}`}
            role="presentation"
            onClick={handleTitleClick}
          >
            {content}
          </div>
          {detail && <div className="text-sm">{detail}</div>}
        </div>
      </div>
      <div
        className={`text-2xl font-bold ${type && (TypeColor(type) === "green" ? "text-[#16a34a]" : TypeColor(type) === "gray" ? "text-gray-700" : "text-[#ef4444]")}`}
      >
        {type &&
          (TypeColor(type) === "green"
            ? "+"
            : TypeColor(type) === "gray"
              ? ""
              : type === "거절"
                ? ""
                : "-")}{" "}
        {point.toLocaleString()} 캐시
      </div>
    </div>
  );
}
