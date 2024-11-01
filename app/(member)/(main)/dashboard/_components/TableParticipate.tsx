export default function TableParticipate({
  count,
  status,
  total,
}: TableParticipateProps) {
  const percent = (count / total) * 100;

  return (
    <div className="flex flex-col gap-1">
      <div className="text-red-500 font-bold">{Math.round(percent)}%</div>
      <div
        className={`font-medium text-sm ${status !== "진행중" && "opacity-50"}`}
      >
        {count}명 참여 <span className="text-gray-600">/ {total}명</span>
      </div>
    </div>
  );
}
