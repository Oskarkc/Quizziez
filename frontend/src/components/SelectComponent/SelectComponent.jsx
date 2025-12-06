import "./SelectComponent.css";

export default function SelectComponent({
  options,
  value,
  onChange,
  style,
  placeholder,
}) {
  return (
    <select
      className="select-component"
      value={value}
      onChange={onChange}
      style={style}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
