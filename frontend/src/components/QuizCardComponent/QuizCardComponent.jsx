import "./QuizCardComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import AllertDialog from "../AllertDialog/AllertDialog";
import { useDeleteUserQuiz } from "../../hooks/useDeleteUserQuiz";
import EditQuizDialog from "../EditQuizDialog/EditQuizDialog";

export default function QuizCardComponent({ quiz }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const handleYes = useDeleteUserQuiz(quiz.id, () => setIsDeleteDialogOpen(false));
    

  return (
    <div className="quizcardcomponent">
      <div className="content">
        <h2>{quiz.name}</h2>
        <p>Category: {quiz.category}</p>
        <p>Difficulty: {quiz.difficulty}</p>
      </div>
      <div className="contentBtns">
        <ButtonComponent onClick={() => setIsEditDialogOpen(true)} style={{"width":"50px", "backgroundColor":"#023618"}}><EditIcon /></ButtonComponent>
        <ButtonComponent onClick={() => setIsDeleteDialogOpen(true)} style={{"width":"50px", "backgroundColor":"#A41623"}}><DeleteOutlineIcon /></ButtonComponent>
      </div>
      {isDeleteDialogOpen && <AllertDialog message="Are you sure you want to delete this quiz?" onNo={()=>setIsDeleteDialogOpen(false)} onYes={() => {handleYes(quiz.id, () => setIsDeleteDialogOpen(false)) }} />}
      {isEditDialogOpen && <EditQuizDialog dialogVisible={setIsEditDialogOpen} existingQuiz={quiz} />}
    </div>
  );
}
