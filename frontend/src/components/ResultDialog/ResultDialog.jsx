import './ResultDialog.css';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

export default function ResultDialog({ correctCount, totalQuestions, onClose }) {
  return (
    <div className="resultdialog-backdrop">
        <div className="resultdialog-content">
            <h2>Quiz Results</h2>
            <h3>Your Score:</h3>
            <p className="resultdialog-score">{((correctCount / totalQuestions) * 100).toFixed(2)}%</p>
            <ButtonComponent onClick={onClose} style={{width:"200px"}}>Back</ButtonComponent>
        </div>
    </div>
  );
}