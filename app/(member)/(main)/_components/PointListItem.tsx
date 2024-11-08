import PointWithdrawalDetailsModal from "../point/(list)/_components/PointWithdrawalDetailsModal";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function PointListItem({
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

  const handleTitleClick = () => {
    if (listType) {
      setModalOpen(true);
      setModalContents(<PointWithdrawalDetailsModal idx={idx} />);
    }
  };

  return (
    <div className="flex justify-between px-8 py-4 border border-[#e1e1e1] rounded-lg">
      <div className="flex gap-5">
        {type && (
          <div className="flex items-center">
            <div
              className={`px-4 py-[10px] rounded-md ${type === "거절" ? "bg-[#fef2f2] text-[#ef4444]" : "bg-[#f0fdf4] text-[#16a34a]"}`}
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
        className={`text-2xl font-bold ${type && type === "거절" ? "text-[#ef4444]" : "text-[#16a34a]"}`}
      >
        {type === "거절" ? "" : "+"} {point.toLocaleString()}P
      </div>
    </div>
  );
}
