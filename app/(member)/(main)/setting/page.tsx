import SettingForm from "./_components/SettingForm";

export default function Client() {
  return (
    <div>
      <div className="text-xl font-bold pb-3">회원 정보</div>
      <SettingForm type="agency" />
    </div>
  );
}
