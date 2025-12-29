import "./QuizCardComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { use, useState } from "react";
import AllertDialog from "../AllertDialog/AllertDialog";
import { useDeleteUserQuiz } from "../../hooks/useDeleteUserQuiz";
import EditQuizDialog from "../EditQuizDialog/EditQuizDialog";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useNavigate } from "react-router-dom";

export default function QuizCardComponent({ quiz, isEditable }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const navigate = useNavigate();
    const handleYes = useDeleteUserQuiz(quiz.id, () => setIsDeleteDialogOpen(false));
    const handlePlay = () => { navigate(`/play/${quiz.id}`)};
    

  return (
    <div className="quizcardcomponent">
      <div className="content">
        <h2>{quiz.name}</h2>
        <p>Category: {quiz.category}</p>
        <p>Difficulty: {quiz.difficulty}</p>
      </div>
      {isEditable && <div className="contentBtns">
        <ButtonComponent onClick={() => setIsEditDialogOpen(true)} style={{"width":"50px", "backgroundColor":"#023618"}}><EditIcon /></ButtonComponent>
        <ButtonComponent onClick={() => setIsDeleteDialogOpen(true)} style={{"width":"50px", "backgroundColor":"#A41623"}}><DeleteOutlineIcon /></ButtonComponent>
      </div>}
      {!isEditable && <div className="contentBtns">
        <ButtonComponent onClick={handlePlay} style={{"width":"50px", "backgroundColor":"#023618"}}><PlayArrowOutlinedIcon /></ButtonComponent>
      </div>}
      {isDeleteDialogOpen && <AllertDialog message="Are you sure you want to delete this quiz?" onNo={()=>setIsDeleteDialogOpen(false)} onYes={() => {handleYes(quiz.id, () => setIsDeleteDialogOpen(false)) }} />}
      {isEditDialogOpen && <EditQuizDialog dialogVisible={setIsEditDialogOpen} existingQuiz={quiz} />}
    </div>
  );
}
