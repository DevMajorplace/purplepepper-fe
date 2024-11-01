export default function TablePeriod({ start, end }: TablePeriodProps) {
  return (
    <div className="text-[13px]">
      {start}
      <br />~ {end}
    </div>
  );
}
