import "./ButtonComponent.css";
export default function ButtonComponent({ onClick, children, style }) {
    return (
        <button className="buttoncomponent" onClick={onClick} style={style}>
            {children}
        </button>
    );
}