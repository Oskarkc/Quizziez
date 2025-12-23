import "./EditQuizDialog.css";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useState } from "react";
import SelectComponent from "../SelectComponent/SelectComponent";
import QuestionComponent from "../QuestionComponent/QuestionComponent/QuestionComponent";
import { useEditQuiz } from "../../hooks/useEditQuiz.jsx";
import ErrorComponent from "../ErrorComponent/ErrorComponent.jsx";

export default function EditQuizDialog({ dialogVisible , existingQuiz }) {
  const {
    questions,
    setQuizTitle,
    setCategory,
    setDifficulty,
    difficulty,
    category,
    quizTitle,
    handleAddQuestion,
    handleQuestionChange,
    handleRemoveQuestion,
    handleonSave,
    handleBack,
    handleSelectCorrectAnswer,
    errors
  } = useEditQuiz(dialogVisible , existingQuiz);


  return (
    <div className="editquizdialog">
      <div className="editquizdialogcontent">
        <h1 className="editquizdialog-header">Edit Quiz</h1>
        <InputComponent
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
        {errors.title && <ErrorComponent message={errors.title} />}
        <SelectComponent
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          options={[
            { value: "Easy", label: "Easy" },
            { value: "Medium", label: "Medium" },
            { value: "Hard", label: "Hard" },
          ]}
          placeholder="Select Difficulty"
        />
        {errors.difficulty && <ErrorComponent message={errors.difficulty} />}
        <SelectComponent
          value={category}
          onChange={(e) => setCategory("Programming")}
          options={[
            { value: "multiple", label: "Multiple Choice" },
            { value: "truefalse", label: "True/False" },
          ]}
          placeholder="Select Category"
        />
        {errors.category && <ErrorComponent message={errors.category} />}
        <div className="scrollablediv">
          {questions.map((q, index) => (
            <div key={q.id} className="questionblock">
              <QuestionComponent
                index={index}
                questionValue={q.question}
                onQuestionChange={(value) =>
                  handleQuestionChange(index, value)
                }
                onAnswerChange={(answerIndex, value) =>
                  handleQuestionChange(index, value, answerIndex)
                }
                answers={q.answers.map(a => a.text)}
                isActive={q.correctAnswerIndex}
                onSelect={(answerIndex) => handleSelectCorrectAnswer(index, answerIndex)}
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
        <div style={{ marginTop: "10px", textAlign: "center" }}>
            {errors.emptyQuestion && <ErrorComponent message={errors.emptyQuestion} />}
            {errors.emptyAnswer && <ErrorComponent message={errors.emptyAnswer} />}
            {errors.missingCorrect && <ErrorComponent message={errors.missingCorrect} />}
        </div>
        <ButtonComponent onClick={handleonSave}>Save</ButtonComponent>
        <ButtonComponent onClick={handleBack}>Back</ButtonComponent>
      </div>
    </div>
  );
}
