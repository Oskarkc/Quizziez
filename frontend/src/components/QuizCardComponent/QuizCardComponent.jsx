import "./QuizCardComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import AllertDialog from "../AllertDialog/AllertDialog";
import { useDeleteUserQuiz } from "../../hooks/useDeleteUserQuiz";

export default function QuizCardComponent({ quiz }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleYes = useDeleteUserQuiz(quiz.id, () => setIsDialogOpen(false));
    

  return (
    <div className="quizcardcomponent">
      <div className="content">
        <h2>{quiz.name}</h2>
        <p>Category: {quiz.category}</p>
        <p>Difficulty: {quiz.difficulty}</p>
      </div>
      <div className="contentBtns">
        <ButtonComponent style={{"width":"50px", "backgroundColor":"#023618"}}><EditIcon /></ButtonComponent>
        <ButtonComponent onClick={() => setIsDialogOpen(true)} style={{"width":"50px", "backgroundColor":"#A41623"}}><DeleteOutlineIcon /></ButtonComponent>
      </div>
      {isDialogOpen && <AllertDialog message="Are you sure you want to delete this quiz?" onNo={()=>setIsDialogOpen(false)} onYes={() => {handleYes(quiz.id, () => setIsDialogOpen(false)) }} />}
    </div>
  );
}
