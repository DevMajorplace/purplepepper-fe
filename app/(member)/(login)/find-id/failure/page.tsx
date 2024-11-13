import Link from "next/link";

import FormWrap from "../../_components/FormWrap";

export default function FindIdFailure() {
  return (
    <FormWrap title="아이디 찾기 실패">
      <div className="text-center mb-8">
        해당 정보로 가입된 회원을 찾을 수 없습니다.
      </div>
      <Link
        className="w-full h-12 bg-navy-800 hover:bg-navy-900 text-white text-center content-center rounded-md cursor-pointer"
        href={`/login`}
      >
        돌아가기
      </Link>
    </FormWrap>
  );
}
