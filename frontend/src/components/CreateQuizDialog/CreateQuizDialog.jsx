import "./CreateQuizDialog.css";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useState } from "react";
import SelectComponent from "../SelectComponent/SelectComponent";
import QuestionComponent from "../QuestionComponent/QuestionComponent/QuestionComponent";

export default function CreateQuizDialog({ dialogVisible }) {
  const [quizTitle, setQuizTitle] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", "", "", ""], correctAnswerIndex: null },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answers: ["", "", "", ""], correctAnswerIndex: null },
    ]);
  };

 const handleQuestionChange = (questionIndex, value, answerIndex = null) => {
  const updatedQuestions = [...questions];
  if (answerIndex === null) {
    updatedQuestions[questionIndex].question = value;
  } else {
    updatedQuestions[questionIndex].answers[answerIndex] = value;
  }
  setQuestions(updatedQuestions);
};

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleBack = () => {
    setQuizTitle("");
    setActiveIndex(null);
    setDifficulty("");
    setCategory("");
    setQuestions([
      { question: "", answers: ["", "", "", ""], correctAnswerIndex: null },
    ]);
    dialogVisible(false);
  };

  const handleonSave = () => {
  
};

  return (
    <div className="createquizdialog">
      <div className="createquizdialogcontent">
        <h1 className="createquizdialog-header">Create a New Quiz</h1>
        <InputComponent
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
        <SelectComponent
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          options={[
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ]}
          placeholder="Select Difficulty"
        />
        <SelectComponent
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: "multiple", label: "Multiple Choice" },
            { value: "truefalse", label: "True/False" },
          ]}
          placeholder="Select Category"
        />
        <div className="scrollablediv">
          {questions.map((q, index) => (
            <div className="questionblock" key={index}>
              <QuestionComponent
                index={index}
                onChange={(answerIndex, value) => handleQuestionChange(index, answerIndex, value)}
                answers={q.answers}
                isActive={activeIndex}
                onSelect={(index) => setActiveIndex(index)}
              />
              {questions.length > 1 && (
                <div className="remove-question-button-wrapper">
                  <ButtonComponent
                    className="remove-button"
                    onClick={() => handleRemoveQuestion(index)}
                    style={{
                      backgroundColor: "red",
                      width: "200px",
                      marginTop: "10px",
                    }}
                  >
                    Remove Question
                  </ButtonComponent>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="add-question-button-wrapper">
          <ButtonComponent
            style={{ backgroundColor: "green" }}
            onClick={handleAddQuestion}
          >
            + Add Question
          </ButtonComponent>
        </div>
        <ButtonComponent onClick={handleonSave}>Save</ButtonComponent>
        <ButtonComponent onClick={handleBack}>Back</ButtonComponent>
      </div>
    </div>
  );
}
