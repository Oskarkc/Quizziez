import InputAnswerComponent from "../InputAnswerComponent/InputAnswerComponent";
import InputComponent from "../../InputComponent/InputComponent";
import "./QuestionComponent.css";

export default function QuestionComponent({
  index,
  questionValue,
  onQuestionChange,
  onAnswerChange,
  onSelect,
  isActive,
  answers,
}) {
  return (
    <div className="questioncomponent-wrapper">
      <InputComponent
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder={`Question ${index + 1}`}
        value={questionValue}
      />
      {answers.map((answer, answerIndex) => (
        <InputAnswerComponent
          key={answerIndex}
          onChange={(value) => onAnswerChange(answerIndex, value)}
          value={answer}
          placeholder={`Answer ${answerIndex + 1}`}
          onSelect={() => onSelect(answerIndex)}
          isActive={isActive === answerIndex}
        />
      ))}
    </div>
  );
}
