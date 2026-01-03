import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import "./AnswerRadioComponent.css";

export default function AnswerRadioComponent({ answerText, isSelected, onClick }) {
  return (
    <div className="answercomponent-wrapper" onClick={onClick}>
      <div className="answertextdiv">
        <p>{answerText}</p>
      </div>
      <div className="radiobuttondiv" onClick={onClick}>
        <button className="answerradio-btn" onClick={onClick}>
          {isSelected ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
        </button>
      </div>
    </div>
  );
}
