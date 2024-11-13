export default function InputWrap({
  name,
  label,
  type,
  placeholder,
  required = true,
  className = "",
  value,
  tabIndex,
  onChange,
}: InputWrapProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        className={`border border-[#d6d6d6] rounded-md h-12 px-3 placeholder:text-[#bbb] ${className}`}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        tabIndex={tabIndex}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
