import "./ErrorComponent.css";

export default function ErrorComponent({ message }) {
  return (
    <div className="errordiv">
      {message}
    </div>
  );
}