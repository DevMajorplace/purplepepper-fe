export default function TableSelect({
  label,
  name,
  value,
  options,
  onChange,
  className,
  selectClassName,
}: TableSelectProps) {
  return (
    <div
      className={`${className ? className : ""} border border-[#ccc] rounded-md px-4 flex items-center gap-1 cursor-pointer h-12`}
    >
      <label htmlFor={name}>{label} : </label>
      <select
        className={`${selectClassName ? selectClassName : ""} pr-2 py-1`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
