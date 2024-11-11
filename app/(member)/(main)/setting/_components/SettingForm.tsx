"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useStore } from "zustand";

import Input from "@/components/Input";
import { useUser } from "@/stores/auth.store";

const BANK_LIST = [
  "KEB하나은행",
  "SC제일은행",
  "국민은행",
  "신한은행",
  "외환은행",
  "우리은행",
  "한국시티은행",
  "경남은행",
  "광주은행",
  "대구은행",
  "부산은행",
  "전북은행",
  "제주은행",
  "기업은행",
  "농협은행",
  "수협은행",
  "한국산업은행",
  "한국수출입은행",
  "SBI저축은행",
  "애큐온저축은행",
  "키움YES저축은행",
  "푸른저축은행",
];

export default function SettingForm({ type }: SettingFormProps) {
  const user = useStore(useUser, (state) => {
    return state.user;
  });
  const [member, setMember] = useState<member>({
    company: "",
    id: "",
    password: "",
    name: "",
    phone: "",
    recommendId: "",
  });
  const router = useRouter();

  useEffect(() => {
    setMember({
      company: user.company,
      id: user.id,
      password: "",
      name: user.name,
      phone: user.phone,
      recommendId: user.recommendId,
    });
  }, [user]);

  // 회원 정보 수정시
  const handleChange = (
    // eslint-disable-next-line prettier/prettier
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (member)
      setMember({
        ...member,
        [name]: value,
      });
  };

  // 출금 계좌 정보 수정시
  const handleAccountChange = (
    // eslint-disable-next-line prettier/prettier
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (member && member.account) {
      setMember({
        ...member,
        account: {
          ...member.account,
          [name]: value,
        },
      });
    }
  };

  // 제출시
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(member);
  };

  return (
    <div className="w-[720px]">
      <form
        className="flex flex-col gap-4 [&_.inputWrap]:flex [&_.inputWrap]:justify-between *:[&_.inputWrap]:w-[49%]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="inputWrap">
          <div className="flex justify-between gap-4">
            <Input
              htmlFor={"company"}
              label={type === "agency" ? "총판명" : "광고주 업체명"}
              name={"company"}
              placeholder={
                type === "agency"
                  ? "총판명을 입력해주세요."
                  : "광고주 업체명을 입력해주세요."
              }
              type={"text"}
              value={member?.company}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {type === "client" && (
            <Input
              htmlFor={"recommendId"}
              label="추천 아이디"
              name={"recommendId"}
              placeholder="추천 아이디를 입력해주세요."
              type={"text"}
              value={member?.recommendId}
              onChange={(e) => handleChange(e)}
            />
          )}
        </div>
        <div className="inputWrap">
          <Input
            htmlFor={"id"}
            label={type === "agency" ? "총판 ID" : "광고주 ID"}
            name={"id"}
            placeholder={
              type === "agency"
                ? "총판 ID를 입력해주세요."
                : "광고주 ID를 입력해주세요."
            }
            type={"text"}
            value={member?.id}
            onChange={(e) => handleChange(e)}
          />
          <Input
            htmlFor={"password"}
            label={type === "agency" ? "총판 비밀번호" : "광고주 비밀번호"}
            name={"password"}
            placeholder="변경될 비밀번호를 입력해주세요."
            type={"text"}
            value={member?.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inputWrap">
          <Input
            htmlFor={"name"}
            label="담당자 이름"
            name={"name"}
            placeholder="담당자 이름을 입력해주세요."
            type={"text"}
            value={member?.name}
            onChange={(e) => handleChange(e)}
          />
          <Input
            htmlFor={"phone"}
            label="담당자 연락처"
            name={"phone"}
            placeholder="담당자 연락처를 입력해주세요."
            type={"text"}
            value={member?.phone}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="py-2">
          <div className="text-[16px] pb-2 font-semibold">출금 계좌 정보</div>
          <div className="inputWrap">
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="bank">은행</label>
                <select
                  className={`h-12 rounded-md px-4 placeholder:text-[#333]/50 bg-white border border-[#ccc]`}
                  id="bank"
                  name="bank"
                  value={member?.account ? member.account.bank : ""}
                  onChange={(e) => handleAccountChange(e)}
                >
                  {BANK_LIST.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                htmlFor={"depositor"}
                label="예금주"
                name={"depositor"}
                placeholder="예금주를 입력해주세요."
                type={"text"}
                value={member?.account ? member.account.depositor : ""}
                onChange={(e) => handleAccountChange(e)}
              />
            </div>
            <Input
              htmlFor={"accountNumber"}
              label="계좌번호"
              name={"accountNumber"}
              placeholder="계좌번호를 입력해주세요."
              type={"text"}
              value={member?.account ? member.account.accountNumber : ""}
              onChange={(e) => handleAccountChange(e)}
            />
          </div>
        </div>
        <div className="flex justify-center gap-3 pt-6 *:px-8 *:py-3 *:rounded-md [&_.addBtn]:bg-[#111] hover:[&_.addBtn]:bg-[#202020] [&_.addBtn]:text-white [&_.cancelBtn]:border [&_.cancelBtn]:border-[#888]">
          <button className="addBtn" type="submit">
            저장
          </button>
          {type === "추가" && (
            <button
              className="cancelBtn"
              type="button"
              onClick={() => router.back()}
            >
              취소
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
