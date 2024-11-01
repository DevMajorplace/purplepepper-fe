export default function BasicCard({
  title,
  content,
  percent,
  onClick,
}: BasicCardProps) {
  return (
    <div className="flex flex-col gap-1" role="presentation" onClick={onClick}>
      <div className="text-[#888]">{title}</div>
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">{content}</div>
        <div
          className={`py-[2px] px-[12px] rounded-3xl ${percent > 0 ? "bg-gray-100" : "bg-[#697077] text-white"}`}
        >
          {percent}%
        </div>
      </div>
    </div>
  );
}
