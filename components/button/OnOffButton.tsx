export default function OnOffButton({ on }: { on: boolean }) {
  return (
    <div
      className={`flex items-center px-[2px] w-[40px] rounded-full h-[24px] ${!on ? "bg-[#000]/20" : "bg-[#000]/80"} transition-all duration-500`}
    >
      <span
        className={`block h-[20px] w-[20px] bg-white rounded-full ${!on ? "" : "translate-x-[16px]"} duration-500`}
      />
    </div>
  );
}
