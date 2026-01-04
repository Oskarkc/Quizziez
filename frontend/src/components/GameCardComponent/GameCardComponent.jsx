import "./GameCardComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from "react-router-dom";

export default function GameCardComponent({ attempt }) {
    const navigate = useNavigate();
  return (
    <div className="gamecard">
      <div className="gamecardcontent">
        <h2 className="gamecardtitle">{attempt.quizTitle}</h2>
        <p className="gamecardscore">Score: {attempt.score}%</p>
        <p className="gamecarddate">
          Zagrano: {new Date(attempt.playedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="gamecardButton">
        <ButtonComponent style={{width: "50px"}} onClick={() => navigate(`/play/${attempt.quizId}`)}><ReplayIcon /></ButtonComponent>
      </div>
    </div>
  );
}
