import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { PiNotePencil } from "react-icons/pi";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function DepositPriceModal({
  depositPrice,
}: {
  depositPrice: { name: string; value: number }[];
}) {
  const [data, setDate] = useState<{ name: string; value: number }[]>([]);
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  useEffect(() => {
    setDate(depositPrice);
  }, [depositPrice]);

  // 입금가 input 포커스시 커서 맨뒤로
  const handlePriceFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    const target = e.target;
    const length = e.target.value.length;

    // setSelectionRange는 type="text"만 사용 가능
    target.type = "text";
    target.setSelectionRange(length, length);
    target.type = "number";
  };

  // 입금가 수정시
  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line prettier/prettier
    name: string
  ) => {
    const newData = data.map((item) => {
      if (item.name === name) {
        return { ...item, value: Number(e.target.value) };
      } else {
        return item;
      }
    });

    setDate(newData);
  };
  const handleConfirmClick = () => {
    console.log(data);
    setModalOpen(false);
    setModalContents(<></>);
  };

  return (
    <>
      <div className="flex flex-col gap-3 mb-5">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="text-[18px]">{item.name} 현재 입금가</div>
            <div>
              <input
                className="w-96 h-12 bg-white border border-[#ccc] rounded-md px-4 placeholder:text-[#333]/50 text-right no_spin_button"
                type="number"
                value={item.value}
                onChange={(e) => handlePriceChange(e, item.name)}
                onFocus={(e) => handlePriceFocus(e)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#000] text-white rounded-md px-4 flex items-center gap-1 cursor-pointer h-12"
          onClick={handleConfirmClick}
        >
          <PiNotePencil className="text-[18px] pt-[1px]" /> 수정 완료
        </button>
      </div>
    </>
  );
}
