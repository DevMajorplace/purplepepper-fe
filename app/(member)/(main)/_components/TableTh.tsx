import { LuArrowDownUp } from "react-icons/lu";

export default function TableTh({
  text,
  className,
  onSort,
}: {
  text: string;
  className?: string;
  onSort?: () => void;
}) {
  return (
    <p
      className={`text pb-4 pr-4 pt-4 font-medium text-gray-600 dark:text-white ${onSort ? "cursor-pointer flex justify-between items-center" : ""} ${className ? className : ""}`}
      role="presentation"
      onClick={onSort}
    >
      {text} {onSort ? <LuArrowDownUp /> : ""}
    </p>
  );
}
