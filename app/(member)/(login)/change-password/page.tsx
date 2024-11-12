"use client";

import { useState } from "react";

import InputWrap from "../_components/InputWrap";
import FormPart from "../_components/FormPart";
import FormWrap from "../_components/FormWrap";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState({
    password: "",
    rePassword: "",
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;

    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <FormWrap title="비밀번호 재설정">
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormPart>
          <div className="relative mb-2">
            <InputWrap
              label={"새 비밀번호"}
              name={"password"}
              placeholder={"새 비밀번호를 입력해주세요."}
              type={"password"}
              value={newPassword.password}
              onChange={handleInput}
            />
          </div>
          <div className="relative mb-2">
            <InputWrap
              label={"비밀번호 확인"}
              name={"rePassword"}
              placeholder={"비밀번호를 다시 한번 입력해주세요."}
              type={"password"}
              value={newPassword.rePassword}
              onChange={handleInput}
            />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <button
              className="w-full h-12 bg-navy-800 hover:bg-navy-900 text-white text-center content-center rounded-md cursor-pointer"
              type={"submit"}
            >
              비밀번호 재설정
            </button>
          </div>
        </FormPart>
      </form>
    </FormWrap>
  );
}
