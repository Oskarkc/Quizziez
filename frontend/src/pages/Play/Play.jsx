import "./Play.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import QuizCardComponent from "../../components/QuizCardComponent/QuizCardComponent";
import { useGetAllQuizzes } from "../../hooks/useGetAllQuizzes";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import { useMemo } from "react";
import { useState } from "react";
import { useGetAllQuizzesOptions } from "../../hooks/useGetQuizzezOptions";

export default function Play() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllQuizzes();
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: optionsData , isLoading: isOptionsLoading , mapper } = useGetAllQuizzesOptions();

  const filteredQuizzes = useMemo(() => {
    if (!data) return [];
    return data.filter((quiz) => {
      return (
        (selectedDifficulty ? quiz.difficulty == selectedDifficulty : true) &&
        (selectedCategory ? quiz.category == selectedCategory : true)
      );
    });
  }, [data, selectedDifficulty, selectedCategory]);
  
  if ( isLoading || isOptionsLoading) {
    return (
      <div className="setupquizdiv">
        <h1 className="myquizheader">Ładowanie quizów...</h1>
      </div>
    );
  }
  
  
  return (
    <div className="setupquizdiv">
      <h1 className="myquizheader">Play Quizzes</h1>
      <div className="filtersdiv">
        <SelectComponent
          value={selectedDifficulty}
          options={mapper(optionsData?.difficulties || [])}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          placeholder="Difficulty"
        />
        <SelectComponent
          value={selectedCategory}
          options={mapper(optionsData?.categories || [])}
          onChange={(e) => setSelectedCategory(e.target.value)}
          placeholder="Category"
        />
      </div>
      <ButtonComponent onClick={() => navigate("/home")}>
        Back To Home
      </ButtonComponent>
      <div className="quizcardcontainer">
        {filteredQuizzes.map((quiz) => (
          <QuizCardComponent key={quiz.id} quiz={quiz} isEditable={false} />
        ))}
      </div>
    </div>
  );
}
