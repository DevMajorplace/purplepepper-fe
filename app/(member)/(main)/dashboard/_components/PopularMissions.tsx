import PopularMission from "./PopularMission";

export default function PopularMissions() {
  return (
    <div className="flex flex-col justify-end h-[64px]">
      <div className="flex">
        <PopularMission count={2811} text="인기 정답미션" />
        <PopularMission count={560} text="인기 공유미션" />
      </div>
    </div>
  );
}
