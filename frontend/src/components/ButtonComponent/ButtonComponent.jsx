import "./ButtonComponent.css";
export default function ButtonComponent({ onClick, children, style, className }) {
    return (
        <button onClick={onClick} style={style} className={`buttoncomponent ${className || ""}`}>
            {children}
        </button>
    );
}