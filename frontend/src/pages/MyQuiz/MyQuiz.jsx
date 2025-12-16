import './MyQuiz.css';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import QuizCardComponent from '../../components/QuizCardComponent/QuizCardComponent';
import { useGetUserQuiz } from '../../hooks/useGetUserQuiz';

export default function MyQuiz() {
    const navigate = useNavigate();
    const { data  } = useGetUserQuiz();
    
    return (
        <div className="setupquizdiv">
            <h1 className="myquizheader">My Quizzes</h1>
            <ButtonComponent onClick={() => navigate("/home")}>Back To Home</ButtonComponent>
            <div className="quizcardcontainer">
                {data?.map((quiz) => (
                    <QuizCardComponent key={quiz.id} quiz={quiz} />
                ))}
            </div>
        </div>
    );
}