"use client";

import { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import debounce from "lodash/debounce";

import InputWrap from "../_components/InputWrap";
import FormPart from "../_components/FormPart";
import FormWrap from "../_components/FormWrap";

type registerProps = {
  company: string;
  name: string;
  phone: string;
  id: string;
  password: string;
  recommand: string;
  certificate: string;
};

const DEFAULT = {
  company: "",
  name: "",
  phone: "",
  id: "",
  password: "",
  recommand: "",
  certificate: "",
};

// 정규식 - 8~20자, 영문, 숫자, 특수문자 포함
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;

export default function Register() {
  const [register, setRegister] = useState<registerProps>(DEFAULT);
  const [validation, setValidation] = useState({
    state: false,
    message: "",
  });
  const [chkPassword, setChkPassword] = useState({
    rePassword: "",
    state: false,
    message: "",
  });
  const [verification, setVerification] = useState(false);

  // 비밀번호 유효성 검사 debounce
  const debounceValidation = debounce((password) => {
    if (password) {
      if (!PASSWORD_REGEX.test(password)) {
        setValidation({
          ...validation,
          message: "8-20자 이하 영문, 숫자, 특수문자가 모두 포함되어야 합니다.",
        });
      } else {
        setValidation({
          state: true,
          message: "",
        });
      }
    } else {
      // 비밀번호가 빈 칸이면
      setValidation({
        ...validation,
        message: "비밀번호를 입력해주세요.",
      });
    }
  }, 200);

  // 비밀번호 확인 debounce
  const debounceChk = debounce((password, rePassword) => {
    if (password !== rePassword) {
      setChkPassword({
        rePassword,
        state: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      setChkPassword({
        rePassword,
        state: true,
        message: "",
      });
    }
  }, 200);

  // 본인인증 클릭
  const handleVerificationClick = () => {
    setVerification(true);
  };

  // 인풋 입력
  const handleInput = (e: any) => {
    const { name, value } = e.target;

    if (name === "phone" && value.length > 11) {
      return false;
    }

    // 비밀번호 입력시
    if (name === "password") {
      // 유효성 검사
      debounceValidation(value);
      // 비밀번호 확인
      if (chkPassword.rePassword) {
        debounceChk(value, chkPassword.rePassword);
      }
    }

    setRegister({
      ...register,
      [name]: value,
    });
  };

  // 비밀번호 확인 입력
  const handleChkPassword = (e: any) => {
    debounceChk(register.password, e.target.value);
  };

  // 이미지 업로드
  const readImage = (image: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(image);
    reader.onloadend = (e) => {
      const {
        currentTarget: { result },
      }: any = e;

      setRegister({
        ...register,
        certificate: result,
      });
    };
  };

  // 사업자 등록증 업로드
  const handleUploadFile = (e: any) => {
    const files: any = e.target.files;

    if (files.length !== 0) {
      const file = files[0];

      readImage(file);
    } else {
      return;
    }
  };

  // 이미지 드래그 앤 드롭
  const handleImgDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      readImage(e.dataTransfer.files[0]);
    }
  };

  // 이미지 삭제
  const handleImgRemove = (e: any) => {
    e.preventDefault();

    setRegister({
      ...register,
      certificate: "",
    });
  };

  // 회원가입 확인
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 비밀번호 유효성 검사 실패시
    if (!validation.state) {
      alert(
        // eslint-disable-next-line prettier/prettier
        "비밀번호는 8-20자 이하 영문, 숫자, 특수문자가\n모두 포함되어야 합니다."
      );
      const password = document.getElementById("password");

      if (password) password.focus();

      return false;
    }

    // 비밀번호 확인 실패시
    if (!chkPassword.state) {
      alert(
        // eslint-disable-next-line prettier/prettier
        "비밀번호가 일치하지 않습니다.\n비밀번호를 다시 확인해주시기 바랍니다."
      );
      const rePassword = document.getElementById("password-re");

      if (rePassword) rePassword.focus();

      return false;
    }

    // 사업자 등록증이 없을때
    if (!register.certificate) {
      alert("사업자 등록증을 업로드 해주시기 바랍니다.");

      return false;
    }

    //console.log(register);
  };

  return (
    <FormWrap title="회원가입">
      <form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
        <FormPart>
          <InputWrap
            label={"업체명"}
            name={"company"}
            placeholder={"업체명을 입력해주세요."}
            type={"text"}
            value={register.company}
            onChange={handleInput}
          />
          <InputWrap
            label={"담당자명"}
            name={"name"}
            placeholder={"담당자명을 입력해주세요."}
            type={"text"}
            value={register.name}
            onChange={handleInput}
          />
          <InputWrap
            label={"연락처"}
            name={"phone"}
            placeholder={"연락처를 입력해주세요(숫자만)."}
            type={"text"}
            value={register.phone}
            onChange={handleInput}
          />
        </FormPart>
        <FormPart>
          <InputWrap
            label={"아이디"}
            name={"id"}
            placeholder={"아이디를 입력해주세요."}
            type={"text"}
            value={register.id}
            onChange={handleInput}
          />
          <div>
            <InputWrap
              className={
                validation.message &&
                "border-2 border-red-600 outline-2 outline-red-600"
              }
              label={"비밀번호"}
              name={"password"}
              placeholder={"8~20자, 영문, 숫자, 특수문자 포함"}
              type={"password"}
              value={register.password}
              onChange={handleInput}
            />
            <span className="text-[12px] text-red-600">
              {validation.message}
            </span>
          </div>
          <div>
            <InputWrap
              className={
                chkPassword.message &&
                "border-2 border-red-600 outline-2 outline-red-600"
              }
              label={"비밀번호 확인"}
              name={"password-re"}
              placeholder={"비밀번호를 다시 입력해주세요."}
              type={"password"}
              onChange={handleChkPassword}
            />
            <span className="text-[12px] text-red-600">
              {chkPassword.message}
            </span>
          </div>
        </FormPart>
        <FormPart>
          <InputWrap
            label={"추천인"}
            name={"recommand"}
            placeholder={"추천인 아이디를 입력해주세요."}
            required={false}
            type={"text"}
            value={register.recommand}
            onChange={handleInput}
          />
        </FormPart>
        <FormPart>
          <div className="">
            사업자 등록증 업로드 <span className="text-red-600">*</span>
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              className="flex flex-col items-center justify-center w-full py-6 px-4 text-center border border-[#d6d6d6] rounded-lg cursor-pointer bg-[#f9f9f9] dark:bg-gray-700 hover:bg-[#f6f6f6] dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800"
              htmlFor="dropzone-file"
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => handleImgDrop(e)}
            >
              <span className="hidden text-[0px] w-0 h-0">
                사업자 등록증 업로드
              </span>
              <div className="flex flex-col items-center justify-center">
                {register.certificate ? (
                  <div className="relative w-[90%]">
                    <img
                      alt="미리보기"
                      className="w-full"
                      src={
                        register.certificate
                          ? register.certificate
                          : `/images/icon/user.png`
                      }
                    />
                    <div
                      className="absolute -right-4 -top-4 text-3xl z-10"
                      role="presentation"
                      onClick={(e) => handleImgRemove(e)}
                    >
                      <RiCloseCircleFill />
                    </div>
                  </div>
                ) : (
                  <div className="py-3 flex flex-col items-center">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mb-2 text-[#999] dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 20 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                    <p className="text-sm text-[#999] dark:text-gray-400">
                      <span className="font-semibold">
                        파일을 드래그 하거나 클릭
                      </span>
                      해서 업로드 해주세요.
                    </p>
                    <p className="text-xs text-[#999] dark:text-gray-400">
                      PNG, JPG, JPEG (MAX. 800x400px)
                    </p>
                  </div>
                )}
              </div>
              <input
                accept=".png, .jpeg, .jpg"
                className="hidden"
                id="dropzone-file"
                name="certificate"
                type="file"
                onChange={(e) => handleUploadFile(e)}
              />
            </label>
          </div>
        </FormPart>
        <FormPart className="mt-2">
          {verification ? (
            <div>
              <div className="w-full h-12 bg-[#e9edf9] text-[#4f66af] text-center content-center rounded-md mb-4 font-semibold">
                인증이 완료되었습니다.
              </div>
              <button
                className="w-full h-12 bg-navy-800 hover:bg-navy-900 text-white text-center content-center rounded-md cursor-pointer"
                type="submit"
              >
                회원가입
              </button>
            </div>
          ) : (
            <div
              className="w-full h-12 bg-navy-800 hover:bg-navy-900 text-white text-center content-center rounded-md cursor-pointer"
              role="presentation"
              onClick={handleVerificationClick}
            >
              본인인증
            </div>
          )}
        </FormPart>
      </form>
    </FormWrap>
  );
}
