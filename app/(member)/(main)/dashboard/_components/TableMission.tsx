export default function TableMission({
  status,
  name,
  type,
}: TableMissionProps) {
  return (
    <div>
      {status && !name && !type && (
        <span
          className={`text-sm px-2 py-1 ${status === "진행중" ? "text-green-600 bg-[#f0fdf4]" : "text-gray-700 bg-[#f5f5f4]"}`}
        >
          {status}
        </span>
      )}
      {name && (
        <div
          className={`font-semibold text-[#333] ${status !== "진행중" && "opacity-50"}`}
        >
          {name}
        </div>
      )}
      {type && (
        <p className={`${status !== "진행중" && "opacity-50"}`}>{type}</p>
      )}
    </div>
  );
}
