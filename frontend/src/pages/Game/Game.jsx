import "./Game.css";
import { useParams } from "react-router-dom";
import { useGetQuizById } from "../../hooks/useGetQuizById";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Game() {
  const { quizId } = useParams();
  const { data, isLoading } = useGetQuizById(quizId);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="gamepagelayout">
      <div className="header">
        <h1>{data.name}</h1>
      </div>
      <div className="questionblock">
        <h2>Question {currentQuestionIndex + 1}:</h2>
        <p>{data.questions[currentQuestionIndex].question}</p>
        <div className="answersdiv">
          {data.questions[currentQuestionIndex].answers.map((answer, index) => (
            <ButtonComponent
              key={index}
              style={{ width: "300px", margin: "10px" }}
            >
              {answer.answer}
            </ButtonComponent>
          ))}
        </div>
      </div>
      <div className="btndiv">
        <div>
          {currentQuestionIndex > 0 && (
            <ButtonComponent
              style={{ width: "100px" }}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            >
              Previous
            </ButtonComponent>
          )}
        </div>
        <div>
          {isLastQuestion ? (
            <ButtonComponent style={{ width: "100px" }}>Finish</ButtonComponent>
          ) : (
            <ButtonComponent
              style={{ width: "100px" }}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            >
              Next
            </ButtonComponent>
          )}
        </div>
      </div>
    </div>
  );
}
