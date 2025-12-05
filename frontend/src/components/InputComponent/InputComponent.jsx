import "./InputComponent.css";

export default function InputComponent({ type, placeholder, value, onChange, style }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="inputcomponent"
            value={value}
            onChange={onChange}
            style={style}
        />
    );
}