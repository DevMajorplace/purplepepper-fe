export default function Textarea({
  name,
  label,
  htmlFor,
  placeholder,
  width = "w-[100%]",
  height = "h-36",
  background = "bg-white",
  border = "border border-[#ccc]",
  className = "",
  value,
  required = false,
  onChange,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor}>{label}</label>
      <textarea
        className={`
        ${width} 
        ${height} 
        ${background} 
        ${border} 
        rounded-md 
        px-4 
        py-3
        placeholder:text-[#333]/50
        resize-none
        ${className}
      `}
        id={htmlFor}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
