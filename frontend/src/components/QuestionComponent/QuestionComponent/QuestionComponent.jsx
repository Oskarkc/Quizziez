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
      {answers.map((answer, answerIndex) => (
        <InputAnswerComponent
            key={answerIndex}
          onChange={value => onChange(answerIndex, value)}
          value={answer}
          placeholder={`Answer ${answerIndex + 1}`}
          onSelect={() => onSelect(answerIndex)}
          isActive={isActive == answerIndex}
        />
      ))}
    </div>
  );
}
