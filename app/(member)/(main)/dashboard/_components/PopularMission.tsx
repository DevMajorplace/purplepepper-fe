export default function PopularMission({
  text,
  count,
}: {
  text: string;
  count: number;
}) {
  return (
    <div className="w-[40%]">
      <p className="text-sm">{text}</p>
      <div className="flex font-medium items-baseline gap-1">
        <strong className="text-[24px]">{count.toLocaleString()}</strong>
        <span>건 달성!</span>
      </div>
    </div>
  );
}
