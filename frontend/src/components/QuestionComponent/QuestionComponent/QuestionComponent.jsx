import InputAnswerComponent from "../InputAnswerComponent/InputAnswerComponent";
import InputComponent from "../../InputComponent/InputComponent";
import "./QuestionComponent.css";

export default function QuestionComponent({
    index,
  onChange,
  onSelect,
  isActive,
  answers,
}) {
  return (
    <div className="questioncomponent-wrapper">
      <InputComponent onChange={e => onChange(index, e.target.value)} placeholder={`Question ${index + 1}`} />
      {answers.map((answer, index) => (
        <InputAnswerComponent
            key={index}
          onChange={e => onChange(index, e.target.value)}
          value={answer}
          placeholder={`Answer ${index + 1}`}
          onSelect={() => onSelect(index)}
          isActive={isActive == index}
        />
      ))}
    </div>
  );
}
