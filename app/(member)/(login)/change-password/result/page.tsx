import Link from "next/link";

import FormWrap from "../../_components/FormWrap";

export default function ChangePasswordResult() {
  return (
    <FormWrap title="비밀번호 재설정 성공">
      <div className="text-center mb-8">
        새로운 비밀번호를 설정했습니다.
        <br />
        다시 로그인 해주세요.
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
