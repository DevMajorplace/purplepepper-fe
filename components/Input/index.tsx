export default function Input({
  name,
  label,
  htmlFor,
  type,
  placeholder,
  width = "w-[100%]",
  height = "h-12",
  background = "bg-white",
  border = "border border-[#ccc]",
  className = "",
  value,
  required = false,
  readOnly = false,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor}>{label}</label>
      <input
        className={`
          ${width} 
          ${height} 
          ${background} 
          ${border} 
          rounded-md 
          px-4 
          placeholder:text-[#333]/50
          ${className}
        `}
        id={htmlFor}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
