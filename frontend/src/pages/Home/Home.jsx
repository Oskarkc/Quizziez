import "./Home.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useState } from "react";
import CreateQuizDialog from "../../components/CreateQuizDialog/CreateQuizDialog";

export default function Home() {
    const navigate = useNavigate();
    const [activeQuizDialog, setActiveQuizDialog] = useState(false);

  return (
    <div className="setuphomediv">
      <div className="homeheader">
        <h1 className="welcomehome">Welcome to Quizziez!</h1>
      </div>
      <div className="homediv">
        <ButtonComponent>Play</ButtonComponent>
        <ButtonComponent onClick={() => setActiveQuizDialog(true)}>Create Quiz</ButtonComponent>
        <ButtonComponent onClick={() => navigate("/myquizzes")}>My Quizziez</ButtonComponent>
        <ButtonComponent>History</ButtonComponent>
        <ButtonComponent onClick={() => navigate("/")}>Logout</ButtonComponent>
      </div>
      {activeQuizDialog && (
        <CreateQuizDialog dialogVisible={setActiveQuizDialog} />
      )}
    </div>
  );
}
