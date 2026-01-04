import "./History.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useGetQuizAttempts } from "../../hooks/useGetQuizAttempts";
import GameCardComponent from "../../components/GameCardComponent/GameCardComponent";
import Game from "../Game/Game";

export default function History() {
  const navigate = useNavigate();
  const { data } = useGetQuizAttempts();
  console.log(data);
  return (
    <div className="setuphistorydiv">
      <h1 className="quizheader">History</h1>
      <ButtonComponent onClick={() => navigate("/home")}>
        Back To Home
      </ButtonComponent>
      <div className="gamecardcontainer">
        {data?.map((attempt) => (
          <GameCardComponent key={attempt.id} attempt={attempt} />
        ))}
      </div>
    </div>
  );
}
