import FormWrap from "../_components/FormWrap";

export default function FindId() {
  return (
    <FormWrap title="아이디 찾기">
      <div className="text-center mb-8">
        아이디 확인을 위해
        <br />
        본인인증을 진행해주세요.
      </div>
      <button
        className="w-full h-12 bg-navy-800 hover:bg-navy-900 text-white text-center content-center rounded-md cursor-pointer"
        type={"button"}
      >
        본인 인증 하기
      </button>
    </FormWrap>
  );
}
