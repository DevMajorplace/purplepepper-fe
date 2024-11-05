"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { PiHandCoins } from "react-icons/pi";

import DepositPriceModal from "./DepositPriceModal";

import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { affiliate } from "@/contexts/AffiliateContext";
import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function AffiliateForm({ affiliate }: AffiliateFormProps) {
  const [info, setInfo] = useState<affiliate>({
    affiliateName: "",
    name: "",
    phone: "",
    apiKey: "",
    memo: "",
    use: true,
    develop: true,
    depositPrice: [
      {
        name: "category1",
        value: 10,
      },
      {
        name: "category2",
        value: 30,
      },
      {
        name: "category3",
        value: 50,
      },
    ],
  });
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  useEffect(() => {
    // 회원 정보가 있으면
    if (affiliate) {
      setInfo({
        affiliateName: affiliate.affiliateName,
        name: affiliate.name,
        phone: affiliate.phone,
        apiKey: affiliate.apiKey,
        memo: affiliate.memo,
        use: affiliate.use,
        develop: affiliate.develop,
        depositPrice: affiliate.depositPrice,
      });
    }
  }, [affiliate]);

  // 입금가 지정 클릭시
  const handleDepositPriceClick = () => {
    setModalOpen(true);
    setModalContents(<DepositPriceModal depositPrice={info.depositPrice} />);
  };

  // 매체사 정보 수정시
  const handleChange = (
    // eslint-disable-next-line prettier/prettier
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });
  };

  // 제출시
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(info);
  };

  return (
    <div className="w-[720px]">
      <form
        className="flex flex-col gap-4 [&_.inputWrap]:flex [&_.inputWrap]:justify-between *:[&_.inputWrap]:w-[49%]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="inputWrap">
          <div className="flex justify-between">
            <Input
              htmlFor={"affiliateName"}
              label="매체사명"
              name={"affiliateName"}
              placeholder="매체사명을 입력해주세요."
              type={"text"}
              value={info.affiliateName}
              onChange={(e) => handleChange(e)}
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="develop">매체사 개발/운영</label>
              <div>
                <div className="inline-flex items-center p-1 bg-[#f6f6f6] rounded-md h-12 *:h-[34px] *:px-5 *:rounded-md *:flex *:items-center *:cursor-pointer">
                  <div
                    className={`${info.develop ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                    role="presentation"
                    onClick={() => setInfo({ ...info, develop: true })}
                  >
                    개발
                  </div>
                  <div
                    className={`${!info.develop ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                    role="presentation"
                    onClick={() => setInfo({ ...info, develop: false })}
                  >
                    운영
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-end">
            <div className="flex flex-col gap-2">
              <label htmlFor="use">사용여부</label>
              <div>
                <div className="inline-flex items-center p-1 bg-[#f6f6f6] rounded-md h-12 *:h-[34px] *:px-5 *:rounded-md *:flex *:items-center *:cursor-pointer">
                  <div
                    className={`${info.use ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                    role="presentation"
                    onClick={() => setInfo({ ...info, use: true })}
                  >
                    사용 중
                  </div>
                  <div
                    className={`${!info.use ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                    role="presentation"
                    onClick={() => setInfo({ ...info, use: false })}
                  >
                    사용 안함
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                className="bg-[#000] text-white rounded-md px-4 flex items-center gap-1 cursor-pointer h-12"
                onClick={handleDepositPriceClick}
              >
                <PiHandCoins className="text-[18px] pt-[1px]" /> 입금가 지정
              </button>
            </div>
          </div>
        </div>
        <div className="inputWrap">
          <Input
            htmlFor={"name"}
            label="담당자 이름"
            name={"name"}
            placeholder="담당자 이름을 입력해주세요."
            type={"text"}
            value={info.name}
            onChange={(e) => handleChange(e)}
          />
          <Input
            htmlFor={"phone"}
            label="담당자 연락처"
            name={"phone"}
            placeholder="담당자 연락처를 입력해주세요."
            type={"text"}
            value={info.phone}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Input
            htmlFor={"apiKey"}
            label="매체사 API KEY"
            name={"apiKey"}
            placeholder="매체사 API KEY를 입력해주세요."
            type={"text"}
            value={info.apiKey}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Textarea
            htmlFor={"memo"}
            label="관리자 메모"
            name={"memo"}
            placeholder="기타 내용을 입력해주세요."
            value={info.memo}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex justify-center gap-3 pt-6 *:px-8 *:py-3 *:rounded-md [&_.addBtn]:bg-[#111] hover:[&_.addBtn]:bg-[#202020] [&_.addBtn]:text-white [&_.cancelBtn]:border [&_.cancelBtn]:border-[#888]">
          <button className="addBtn" type="submit">
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
