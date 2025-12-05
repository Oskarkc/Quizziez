import "./CreateQuizDialog.css";
import InputComponent from "../InputComponent/InputComponent";
import InputAnswerComponent from "../InputAnswerComponent/InputAnswerComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useState } from "react";

export default function CreateQuizDialog({ onClose, onSave }) {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="createquizdialog">
      <div className="createquizdialogcontent">
        <h1 className="createquizdialog-header">Create a New Quiz</h1>
        <InputComponent type="text" placeholder="Quiz Question" style={{ width: "100%" }} />
        {answers.map((answer, index) => (
          <InputAnswerComponent
            key={index}
            value={answer}
            placeholder={`Answer ${index + 1}`}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            isActive={activeIndex === index}
            onSelect={() => setActiveIndex(index)}
          />
        ))}
        <ButtonComponent onClick={onSave}>Save</ButtonComponent>
        <ButtonComponent onClick={onClose}>Back</ButtonComponent>
      </div>
    </div>
  );
}
