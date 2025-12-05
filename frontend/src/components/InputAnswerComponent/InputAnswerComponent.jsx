import "./InputAnswerComponent.css";
import InputComponent from "../InputComponent/InputComponent";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

export default function InputAnswerComponent({
  placeholder,
  value,
  onChange,
  onSelect,
  isActive,
}) {
  return (
    <div className="inputanswercomponent-wrapper">
      <InputComponent
        type="text"
        placeholder={placeholder}
        className="inputanswercomponent"
        value={value}
        onChange={onChange}
      />
        <button type="button" onClick={onSelect} className="radio-btn">
          {isActive ? <DoneIcon style={{ color: "green" }} /> : <CloseIcon style={{ color: "red" }} />}
        </button>
    </div>
  );
}
