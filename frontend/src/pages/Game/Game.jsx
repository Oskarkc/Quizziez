import "./Game.css";
import { useParams } from "react-router-dom";
import { useGetQuizById } from "../../hooks/useGetQuizById";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnswerRadioComponent from "../../components/AnswerComponent/AnswerRadioComponent";
import { useCreateQuizAttempt } from "../../hooks/useCreateQuizAttempt";
import ResultDialog from "../../components/ResultDialog/ResultDialog";

export default function Game() {
  const { quizId } = useParams();
  const { data, isLoading } = useGetQuizById(quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const { userAnswers, handleAnswerSelect, onFinish , correctCount } = useCreateQuizAttempt(data);
  const [isResultPage, setIsResultPage] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gamepagelayout">
      <div className="header">
        <h1>{data.name}</h1>
      </div>
      <div className="questionblock">
        <div className="questionheader">
          <h2 className="questionheaderh2">
            Question {currentQuestionIndex + 1} of {data.questions.length}
          </h2>
        </div>
        <p>{data.questions[currentQuestionIndex].question}</p>
        <div className="answersdiv">
          {data.questions[currentQuestionIndex].answers.map((answer, index) => (
            <AnswerRadioComponent
              key={index}
              answerText={answer.answer}
              isSelected={index === userAnswers[currentQuestionIndex]}
              onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
            ></AnswerRadioComponent>
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
          {currentQuestionIndex + 1 == data.questions.length ? (
            <ButtonComponent
              style={{ width: "100px", backgroundColor: "green" }}
              onClick={() => {
                onFinish(data);
                setIsResultPage(true);
              }}
            >
              Finish
            </ButtonComponent>
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
      {isResultPage && (
        <ResultDialog
          correctCount={correctCount}
          totalQuestions={data.questions.length}
          onClose={() => {
            setIsResultPage(false);
            navigate("/home");
          }}
        />
      )}
    </div>
  );
}
