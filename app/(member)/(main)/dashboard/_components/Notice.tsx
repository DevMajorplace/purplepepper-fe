import { IoIosArrowForward } from "react-icons/io";

export default function Notice() {
  return (
    <div className="flex justify-between items-center">
      <div className="w-[80px] font-semibold text-[16px]">공지사항</div>
      <div className="w-[calc(100%-104px)]">공지사항 내용</div>
      <IoIosArrowForward className="w-[24px] text-2xl" />
    </div>
  );
}
