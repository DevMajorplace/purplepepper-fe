import Link from "next/link";

import FormWrap from "../../_components/FormWrap";

export default function FindIdSuccess() {
  return (
    <FormWrap title="아이디를 찾았습니다!">
      <div className="text-center mb-6 pb-6 flex flex-col items-start gap-1 border-b border-b-[#ccc]">
        <span>당신의 아이디:</span>
        <p className="w-full h-12 border border-[#ccc] text-[#000] text-center content-center rounded-md">
          TEST
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Link
          className="w-full h-12 border border-[#ccc] text-[#000] text-center content-center rounded-md"
          href={`/find-password`}
        >
          비밀번호 찾기
        </Link>
        <Link
          className="w-full h-12 bg-navy-800 hover:bg-navy-900 text-white text-center content-center rounded-md cursor-pointer"
          href={`/login`}
        >
          돌아가기
        </Link>
      </div>
    </FormWrap>
  );
}
