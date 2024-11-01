export default function CompletedMissions() {
  return (
    <div className="flex flex-col justify-between h-[64px]">
      <p className="text-sm">오늘까지 유저들이 수행한 미션이에요!</p>
      <div className="text-[28px] font-bold">
        {(5000000).toLocaleString()}개
      </div>
    </div>
  );
}
