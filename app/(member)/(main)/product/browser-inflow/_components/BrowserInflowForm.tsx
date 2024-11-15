"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

const APP_DEFAULT = {
  appName: "",
  uriScheme: "",
  appLink: "",
  universalLink: "",
};

export default function BrowserInflowForm({
  type,
  idx,
}: BrowserInflowFormProps) {
  const [info, setInfo] = useState<browserInflow>({
    idx: "",
    name: "",
    type: 1,
    isUse: true,
  });
  const router = useRouter();

  useEffect(() => {
    // 회원 정보가 있으면
    if (idx === "idx1") {
      setInfo({
        idx: idx,
        name: "브라우저 유입 경로명",
        type: 1,
        isUse: true,
        appName: "앱 이름",
        uriScheme: "URI Scheme",
        appLink: "안드로이드 앱링크",
        universalLink: "아이폰 앱링크",
      });
    } else if (idx === "idx2") {
      setInfo({
        idx: idx,
        name: "브라우저 유입 경로명",
        type: 3,
        isUse: true,
      });
    }
  }, [idx]);

  // 정보 수정시
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

  // 경로 실행 타입 선택시
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    //console.log(e);
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
    <div className="w-[880px]">
      <form
        className="flex flex-col gap-4 [&_.inputWrap]:flex [&_.inputWrap]:justify-between *:[&_.inputWrap]:w-[49%]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="text-[18px] font-bold">브라우저 유입 경로 정보</div>
        <div className="inputWrap">
          <Input
            htmlFor={"name"}
            label="브라우저 유입 경로명"
            name={"name"}
            placeholder="브라우저 유입 경로명을 입력해주세요."
            type={"text"}
            value={info.name}
            onChange={(e) => handleChange(e)}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="isUse">사용여부</label>
            <div>
              <div className="inline-flex items-center p-1 bg-[#f6f6f6] rounded-md h-12 *:h-[34px] *:px-5 *:rounded-md *:flex *:items-center *:cursor-pointer">
                <div
                  className={`${info.isUse ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() => setInfo({ ...info, isUse: true })}
                >
                  사용 중
                </div>
                <div
                  className={`${!info.isUse ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() => setInfo({ ...info, isUse: false })}
                >
                  사용 안함
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="type">경로 실행 타입</label>
          <div className="flex justify-between *:w-[32%] *:h-12 *:text-center *:content-center *:rounded-md *:cursor-pointer">
            <div
              className={`${info.type === 1 ? "bg-[#18181B]" : "bg-[#18181B]/50"} text-[#fff]`}
              role="presentation"
              onClick={() => setInfo({ ...info, type: 1 })}
            >
              1. 지정된 앱 실행 및 미설치 시 설치 유도
            </div>
            <div
              className={`${info.type === 2 ? "bg-[#18181B]" : "bg-[#18181B]/50"} text-[#fff]`}
              role="presentation"
              onClick={() => setInfo({ ...info, type: 2 })}
            >
              2. 지정된 앱 실행 및 미설치 시 기본 브라우저
            </div>
            <div
              className={`${info.type === 3 ? "bg-[#18181B]" : "bg-[#18181B]/50"} text-[#fff]`}
              role="presentation"
              onClick={() => setInfo({ ...info, type: 3 })}
            >
              3. 기존 브라우저 실행
            </div>
          </div>
        </div>
        {info.type !== 3 && (
          <>
            <div className="">
              <Input
                htmlFor={"appName"}
                label="실행할 앱 이름"
                name={"appName"}
                placeholder="실행할 앱 이름을 입력해주세요."
                type={"text"}
                value={info.appName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="">
              <Input
                htmlFor={"uriScheme"}
                label="URI Scheme"
                name={"uriScheme"}
                placeholder="URI Scheme를 입력해주세요."
                type={"text"}
                value={info.uriScheme}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="">
              <Input
                htmlFor={"appLink"}
                label="앱링크(안드로이드)"
                name={"appLink"}
                placeholder="앱링크(안드로이드)를 입력해주세요."
                type={"text"}
                value={info.appLink}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="">
              <Input
                htmlFor={"universalLink"}
                label="유니버셜링크(아이폰)"
                name={"universalLink"}
                placeholder="유니버셜링크(아이폰)를 입력해주세요."
                type={"text"}
                value={info.universalLink}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </>
        )}
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
            {type === "추가" ? "저장" : "수정"}
          </button>
          <button
            className="cancelBtn"
            type="button"
            onClick={() => router.back()}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
